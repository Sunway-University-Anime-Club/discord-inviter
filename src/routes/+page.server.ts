import { env } from '$env/dynamic/private';
import { googleClient, service } from '$lib/server/google';
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
}

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
			return { studentId, valid: false }
		}

		// Get the imail of the student using the student id
		let studentImail = studentId;
		if (!studentImail.endsWith(imailSuffix)) {
			studentImail = `${studentImail}@${imailSuffix}`;
		}

		// TODO: generate invite link
		// TODO: send invite link to imail

		return { studentId, studentImail, valid: true };
	}
} satisfies Actions;
