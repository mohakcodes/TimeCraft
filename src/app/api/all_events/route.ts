import { Event } from "@/app/models/event";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    //get all events
    const res = await Event.find({flag:true});
    return NextResponse.json(res);
}