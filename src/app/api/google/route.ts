import { scopes } from "@/utils/starter";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {

    const oauth2Client = new google.auth.OAuth2(
        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET,
        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REFRESH,
    );

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    });
    
    return NextResponse.json({url});
}