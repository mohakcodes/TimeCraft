import { User } from "@/app/models/user";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {code, oauth2Client} = await req.json();

    const tokens = await oauth2Client.getToken(code);
    console.log("Tokens", tokens);
    oauth2Client.setCredentials(tokens.tokens);

    const calendar = oauth2Client.calendar({
        version: "v3",
        auth: oauth2Client,
    })

    const id_token = tokens.tokens.id_token || "";

    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
    const userEmail = userResponse.data.email;
    console.log("User email", userEmail);
    
    let userExist = await User.findOne({ email: userEmail });
    if (userExist) {
        // Check if less than 5 minutes are left until expiration
        const currentTime = Date.now();
        const expireTime = userExist.expireTime;
        const timeDifference = expireTime - currentTime;
        if (timeDifference < 300000) {
            // Delete user from database if less than 5 minutes are left until expiration
            await User.findByIdAndDelete(userExist._id);
        } 
        else {
            console.log("User already exists:", userExist, "diff", timeDifference);
            return NextResponse.redirect(`http://localhost:3000/homepage?id=${userExist._id}`);
        }
        // Save user data in User model
        const newUser = new User({
            email: userEmail,
            expireTime: tokens.tokens.expiry_date,
            oauth2Client: oauth2Client,
            calendar: calendar,
        });
        await newUser.save();
        console.log("New user saved:", newUser);

        return NextResponse.redirect(`http://localhost:3000/homepage?id=${newUser._id}`);
    }

    return NextResponse.json({ message: "Hello" , code: code, oauth2Client: oauth2Client});
}