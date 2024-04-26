import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(env.SUPABASE_URI, env.SUPABASE_KEY);
