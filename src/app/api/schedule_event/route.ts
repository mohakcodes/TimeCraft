import axios from "axios";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid} from 'uuid';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(req: NextRequest) {
    const {summary,description,startDateTime,timeZone,owner,eventId,userId} = await req.json();

    const user = await axios.get(`http://localhost:3000/api/get_user/${userId}`);
    const getEvent = await axios.get(`http://localhost:3000/api/all_events/${eventId}`);
    const access_token = getEvent.data.access_token;

    const attendee = user.data.user.email;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token });

    // Create a new instance of Google Calendar API with OAuth2 client
    const calendar = google.calendar({
        version: "v3",
        auth: oauth2Client,
    });

    //startTime is already in timezone of user, getting end time
    const endDateTime = dayjs(startDateTime).add(1, 'hour').format();

    const event = {
        summary: summary,
        description: description,
        start:{
            dateTime: startDateTime,
        },
        end:{
            dateTime: endDateTime,
        },
        conferenceData:{
            createRequest:{
                requestId:uuid(),
            },
        },
        creator:{
            email:owner,
        },
        organizer:{
            email:owner,
        },
        attendees:[
            {
                email:owner,
            },
            {
                email:attendee,
            }
        ]
    };
    
    await calendar.events.insert({
        calendarId: "primary",
        auth: oauth2Client,
        conferenceDataVersion: 1,
        requestBody: event,
    });

    return NextResponse.json("Event scheduled successfully");
}