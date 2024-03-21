import axios from "axios";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid} from 'uuid';

export async function POST(req: NextRequest) {
    const {summary,description,startDateTime,endDateTime,timeZone,owner,eventId,userId} = await req.json();

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

    const event = {
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

    // const eventId = response.data.id;
    // console.log("Event created:", eventId);
    // console.log("Organizer:", owner);

    // if (eventId) {
    //     await calendar.events.patch({
    //         calendarId: "primary",
    //         eventId: eventId,
    //         auth: oauth2Client,
    //         requestBody: {
    //             creator: {
    //                 email: owner,
    //             },
    //         }
    //     });
    // }

    return NextResponse.json("Event scheduled successfully");
}