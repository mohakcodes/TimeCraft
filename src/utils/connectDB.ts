import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const mongoURI = process.env.NEXT_PUBLIC_MONGO_URI || "";
        await mongoose.connect(mongoURI);
    } catch (err) {
        console.log(err);
    }
}