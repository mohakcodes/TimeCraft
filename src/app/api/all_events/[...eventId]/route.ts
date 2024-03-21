import { Event } from "@/app/models/event";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const eventId = url.pathname.split("/").slice(3);
    //get all events
    const res = await Event.findById(eventId[0]);
    return NextResponse.json(res);
}