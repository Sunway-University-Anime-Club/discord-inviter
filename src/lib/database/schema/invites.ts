import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const invites = pgTable('invites', {
	id: serial('id').primaryKey(),
	inviteUrl: text('invite_url'),
	used: boolean('used').default(false)
});
