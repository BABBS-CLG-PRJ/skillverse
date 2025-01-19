import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Course from "../../models/course";
import StudentProfile from "../../models/student";
import InstructorProfile from "../../models/instructor";
import mongoose from "mongoose";

export async function POST(req) {
    const session = await mongoose.startSession();

    try {
        const { courseId, uid, orderhistory } = await req.json();

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

        // Start a transaction
        session.startTransaction();

        // Add the student to the course's `studentsEnrolled` field
        const courseDetails = await Course.findOneAndUpdate(
            { _id: courseId },
            { $addToSet: { studentsEnrolled: userId } },
            { returnDocument: "after", session }
        );

        // Check if the course exists
        if (!courseDetails) {
            await session.abortTransaction();
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Add the course to the student's `coursesEnrolled` field in `StudentProfile`
        const studentProfile = await StudentProfile.findOneAndUpdate(
            { user: userId },
            {
                $addToSet: {
                    coursesEnrolled: {
                        course: courseId,
                        progress: 0,
                    }
                },
                $push: {
                    orderHistory: {
                        $each: [{
                            orderId: orderhistory.orderId,
                            paymentId: orderhistory.paymentId,
                            status: orderhistory.status,
                        }]
                    }
                }
            },
            { returnDocument: "after", session }
        );
        

        // Check if the student's profile exists
        if (!studentProfile) {
            await session.abortTransaction();
            return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
        }

        // Add the student to the instructor's profile and update totalStudents
        const instructorId = courseDetails.instructor; // Assuming the `instructor` field in the course details
        const instructorProfile = await InstructorProfile.findOneAndUpdate(
            { user: instructorId },
            {
                $inc: { totalStudents: 1 },
                $addToSet: {
                    students: userId
                },
                $push: {
                    orderHistory: {
                        $each: [{
                            orderId: orderhistory.orderId,
                            paymentId: orderhistory.paymentId,
                            status: orderhistory.status,
                        }]
                    }
                }
            },
            { returnDocument: "after", session }
        );
        

        // Check if the instructor's profile exists
        if (!instructorProfile) {
            await session.abortTransaction();
            return NextResponse.json({ error: "Instructor profile not found" }, { status: 404 });
        }

        // Commit the transaction
        await session.commitTransaction();

        // Return the updated course, student profile, and instructor profile details
        return NextResponse.json({ courseDetails, studentProfile, instructorProfile }, { status: 200 });

    } catch (error) {
        // Handle unexpected errors
        console.error("Error enrolling student:", error);
        await session.abortTransaction();
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        session.endSession();
    }
}
