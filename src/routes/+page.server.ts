import { env } from '$env/dynamic/private';
import { discordClient } from '$lib/server/discord';
import { googleClient, service } from '$lib/server/google';
import type { Invite } from 'discord.js';
import type { Actions } from './$types';

interface FormResponse {
	studentId: string;
	valid: boolean;
	studentImail?: string;
}

const imailSuffix = 'imail.sunway.edu.my';

/**
 * Check if student id provided is registered in the spreadsheet.
 * Only works for students who have registered in 2024.
 *
 * @param {string} studentId
 * @return {*}  {Promise<boolean>}
 */
const isRegistered = async (studentId: string): Promise<boolean> => {
	// Fetch responses from the spreadsheet
	const response = await service.spreadsheets.values.get({
		auth: googleClient,
		spreadsheetId: env.REGISTRATION_FORM_ID,
		range: 'C:C' // C is the column for student id
	});

	// Check if fetch request was successful
	if (response.status !== 200) return false;

	// Check if there are responses in the spreadsheet
	const rows = response.data.values;
	if (!rows?.length) return false;

	// Look if there is a match
	for (const row of rows) {
		if (String(row[0]).trim() === studentId) return true;
	}

	return false;
};

/**
 * Generate a discord invite that lasts for minutes provided and can only be used once.
 *
 * @param {number} minutes
 * @return {*}  {Promise<Invite>}
 */
const generateInvite = async (minutes: number): Promise<Invite> => {
	// Fetch the discord server
	const guild = await discordClient.guilds.fetch(env.DISCORD_GUILD_ID);

	// Create a single use invite link that expires in 30 minutes
	return await guild.invites.create(env.DISCORD_ENTRY_CHANNEL_ID, {
		maxUses: 1,
		unique: true,
		maxAge: minutes * 60, // convert to seconds
		reason: 'User request'
	});
};

export const actions = {
	inviteRequest: async ({ request }): Promise<FormResponse> => {
		// Get the user input from the form submission
		const formData = await request.formData();
		const studentId = formData.get('student_id')?.toString() || '';

		// Check if the input was a valid student id or imail
		const validRegex = /^\d{8}(@imail\.sunway\.edu\.my)?$/gi;
		if (!validRegex.test(studentId)) {
			return { studentId, valid: false };
		}

		// Check if user has registered
		// The split is to ensure that only the student id is selected if imail was provided
		if (!(await isRegistered(studentId.split('@')[0]))) {
			return { studentId, valid: false };
		}

		// Get the imail of the student using the student id
		let studentImail = studentId;
		if (!studentImail.endsWith(imailSuffix)) {
			studentImail = `${studentImail}@${imailSuffix}`;
		}

		// TODO: generate invite link
		const invite = await generateInvite(30);
		console.log(invite);
		console.log(invite.url);

		// TODO: send invite link to imail

		return { studentId, studentImail, valid: true };
	}
} satisfies Actions;
