import { env } from '$env/dynamic/private';
import { createTransport } from 'nodemailer';

// Create the email client for sending email
export const emailClient = createTransport({
	name: env.EMAIL_HOST,
	host: env.EMAIL_HOST,
	port: Number(env.EMAIL_PORT),
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASSWORD
	},
	secure: env.EMAIL_SECURE === 'true',
	tls: {
		rejectUnauthorized: env.EMAIL_SECURE === 'true'
	}
});
