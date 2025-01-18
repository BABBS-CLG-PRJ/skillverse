import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import Course from "../../models/course";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        const { courseId, uid } = await req.json();

        // Validate input
        if (!courseId || !uid) {
            return NextResponse.json({ error: "Missing courseId or uid" }, { status: 400 });
        }

        // Convert uid to ObjectId
        let userId;
        try {
            userId = new mongoose.Types.ObjectId(uid);
        } catch (e) {
            return NextResponse.json({ error: "Invalid uid" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Atomic operation to add uid to studentsEnrolled if not already present
        const courseDetails = await Course.findOneAndUpdate(
            { _id: courseId },
            { $addToSet: { studentsEnrolled: userId } },
            { returnDocument: 'after' }
        );

        // Check if course exists
        if (!courseDetails) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Return the updated course details
        return NextResponse.json({ courseDetails }, { status: 200 });

    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}