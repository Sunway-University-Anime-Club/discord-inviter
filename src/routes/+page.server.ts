import type { Actions } from './$types';

const validRegex = /^\d{8}(@imail\.sunway\.edu\.my)?$/gi;

export const actions = {
	inviteRequest: async ({ request }) => {
		const formData = await request.formData();
		const studentId = formData.get('student_id')?.toString();

		return { studentId };
	}
} satisfies Actions;
