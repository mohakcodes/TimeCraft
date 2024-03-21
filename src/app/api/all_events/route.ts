import { Event } from "@/app/models/event";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    //get all events
    const res = await Event.find({flag:true});
    const sendevent = res.map(event => {
        const { access_token, ...sanitizedEvent } = event.toObject();
        return sanitizedEvent;
    });
    return NextResponse.json(sendevent);
}