import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid} from 'uuid';

export async function POST(req: NextRequest) {

    const {summary,description,startDateTime,endDateTime,timeZone,owner,attendee,oauth2Client,calendar} = await req.json();

    await calendar.events.insert({
        calendarId:"primary",
        // auth: oauth2Client,
        conferenceDataVersion: 1,
        requestBody:{
            summary: summary,
            description: description,
            start:{
                dateTime:startDateTime,
                timeZone: timeZone,
            },
            end:{
                dateTime:endDateTime,
                timeZone: timeZone,
            },
            conferenceData:{
                createRequest:{
                    requestId:uuid(),
                },
            },
            organizer:{
                email:owner,
            },
            attendees:[
                {
                    email:attendee,
                }
            ]
        },
    })
    return NextResponse.json("Event scheduled successfully");
}