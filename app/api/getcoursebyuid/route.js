import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import User from "../../models/user"; // Import User model
import Course from "../../models/course"; // Import Course model
import { Types } from "mongoose";

export async function POST(req) {
    const { uid } = await req.json(); // Extract the user ID from the request body

    try {
        await connectToDatabase(); // Connect to the database

        // Find the user by uid
        const user = await User.findById(uid).select("role");
        console.log(user);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if the user is an instructor
        if (user.role !== "Instructor") {
            return NextResponse.json({ error: "User is not an instructor" }, { status: 403 });
        }

        // Find courses associated with the instructor
        const courseDetails = await Course.find({ instructor: new Types.ObjectId(uid) });
        console.log(courseDetails);

        return NextResponse.json({ courseDetails });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
}
