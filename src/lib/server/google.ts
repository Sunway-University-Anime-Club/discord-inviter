import { env } from '$env/dynamic/private';
import { google } from 'googleapis';

// Create the google client to access spreadsheets
export const service = google.sheets('v4');
export const googleClient = new google.auth.JWT(
  env.GOOGLE_CLIENT_EMAIL,
  undefined,
  env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);
