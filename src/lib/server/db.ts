import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(env.SUPABASE_DB_URI, { prepare: false });
export const db = drizzle(client);
