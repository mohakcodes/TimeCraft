import { Event } from "@/app/models/event";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    const {summary,description,timeZone,eventLink,startDateTime,endDateTime,owner,flag,access_token} = await req.json();
    const event = new Event({
        summary,description,timeZone,eventLink,startDateTime,endDateTime,owner,flag,access_token,
    });
    await event.save();
    return NextResponse.json({message: "Event Created"});
}