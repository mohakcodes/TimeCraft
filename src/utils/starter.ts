import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REFRESH,
);

export const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "openid",
    "email",
];