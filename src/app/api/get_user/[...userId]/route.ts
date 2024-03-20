import { User } from "@/app/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    //split the url, choose last one
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop();

    //fetch user from User
    const user = await User.findById(userId);
    return NextResponse.json({ user });
}