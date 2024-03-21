import { oauth2Client } from "@/utils/starter";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/user";
import { connectDB } from "@/utils/connectDB";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const code = url.searchParams.get("code");
        if (!code) {
            throw new Error("Invalid code");
        }

        const client = oauth2Client;

        const tokens = await client.getToken(code);
        client.setCredentials(tokens.tokens);

        const id_token = tokens.tokens.id_token || "";

        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
        const userEmail = userResponse.data.email;

        let userExist = await User.findOne({ email: userEmail });
        
        if (userExist) {
            // Check if less than 5 minutes are left until expiration
            const currentTime = Date.now();
            const expireTime = userExist.expireTime;
            const timeDifference = expireTime - currentTime;
            if (timeDifference < 300000) {
                // Delete user from database if less than 5 minutes are left until expiration
                await User.findByIdAndDelete(userExist._id);
            } else {
                console.log("User already exists:", userExist, "diff", timeDifference);
                return NextResponse.redirect(`http://localhost:3000/homepage?id=${userExist._id}`);
            }
        }

        // Save user data in User model
        const newUser = new User({
            email: userEmail,
            expireTime: tokens.tokens.expiry_date,
            access_token: tokens.tokens.access_token,
        });
        await newUser.save();
        console.log("New user saved:", newUser);

        return NextResponse.redirect(`http://localhost:3000/homepage?id=${newUser._id}`);
    } 
    catch (error) {
        console.error("Error:", error);
        return NextResponse.error();
    }
}
