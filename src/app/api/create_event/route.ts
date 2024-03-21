import { Event } from "@/app/models/event";
import { connectDB } from "@/utils/connectDB";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    const {summary,description,timeZone,eventLink,startDateTime,flag,userId} = await req.json();
    const user = await axios.get(`http://localhost:3000/api/get_user/${userId}`);
    const owner = user.data.user.email;
    const access_token = user.data.user.access_token;
    const event = new Event({
        summary,description,timeZone,eventLink,startDateTime,owner,flag,access_token,
    });
    await event.save();
    return NextResponse.json({message: "Event Created"});
}