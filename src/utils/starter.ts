import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REFRESH,
);

export const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "openid",
    "email",
];

// export const calendar = google.calendar({
//     version: "v3",
//     auth: oauth2Client,
// })