import { env } from '$env/dynamic/private';
import Email from '$lib/components/email.svelte';
import { discordClient } from '$lib/server/discord';
import { emailClient } from '$lib/server/email';
import { googleClient, service } from '$lib/server/google';
import type { Invite } from 'discord.js';
import { render } from 'svelte-email';
import type { Actions } from './$types';

interface FormResponse {
	valid: boolean;
	message: string;
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
	const rows: unknown[][] = [];

	// Fetch every registered Student IDs in the list of provided Spreadsheet IDs
	for (const spreadsheetId of env.REGISTRATION_FORM_IDS.split(',')) {
		// Fetch responses from the spreadsheet
		const response = await service.spreadsheets.values.get({
			auth: googleClient,
			spreadsheetId,
			range: 'C:C' // C is the column for student id
		});

		// Check if fetch request was successful
		if (response.status !== 200) continue;

		// Check if the response has found any data
		const spreadsheetRow = response.data.values;
		if (!spreadsheetRow?.length) continue;

		// Push the responses into a global list of rows
		rows.push(...spreadsheetRow);
	}

	// Look if there is a match
	for (const row of rows) {
		if (String(row[0]).trim() === studentId) return true;
	}

	// Allow certain student ids through
	if (env.ALLOWED_IDS.split(',').includes(studentId)) return true;

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
	inviteRequest: async ({ request, cookies, url }): Promise<FormResponse> => {
		// Check if there is a cooldown cookie before continuing
		// If the cookie expired, then the cookie does not exist and thus can continue
		const cooldownCookie = cookies.get('cooldown');
		if (cooldownCookie) return { valid: false, message: 'Invitation request is on cooldown.' };

		// Get the user input from the form submission
		const formData = await request.formData();
		const studentId = formData.get('student_id')?.toString() || '';

		// Check if the input was a valid student id or imail
		const validRegex = /^\d{8}(@imail\.sunway\.edu\.my)?$/gi;
		if (!validRegex.test(studentId)) {
			return { valid: false, message: 'An invalid Student ID or Imail has been provided.' };
		}

		// Check if user has registered
		// The split is to ensure that only the student id is selected if imail was provided
		if (!(await isRegistered(studentId.split('@')[0]))) {
			return {
				valid: false,
				message:
					'Registration not found. Register first or reach out for help if you think this was a mistake.'
			};
		}

		// Get the imail of the student using the student id
		let studentImail = studentId;
		if (!studentImail.endsWith(imailSuffix)) {
			studentImail = `${studentImail}@${imailSuffix}`;
		}

		// Generate invite link
		const invite = await generateInvite(30);

		// Render the email template with the appropriate data
		const html = render({
			template: Email,
			props: {
				invite: invite.url,
				logo: `${url.origin}/logos/suac-large.png`
			}
		});

		// Send the email the the student imail
		await emailClient.sendMail({
			to: [studentImail],
			from: `Sunway University Anime Club <${env.EMAIL_USER}>`,
			subject: 'Discord Invite Request',
			html
		});

		// Set a cookie that expires as the cooldown
		cookies.set('cooldown', 'requested', {
			httpOnly: true,
			path: '/',
			maxAge: 10 * 60,
			secure: false
		});

		return {
			valid: true,
			message: 'You have successfully requested an invite. Check your imail.'
		};
	}
} satisfies Actions;
