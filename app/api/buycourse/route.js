import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Course from "../../models/course";
import StudentProfile from "../../models/student";
import InstructorProfile from "../../models/instructor";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"; // Add this import

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
        const instructorId = courseDetails.instructor;
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

        // Generate new JWT token with updated profile
        const updatedTokenPayload = {
            userId: userId,
            profileObject: studentProfile,
            // Add any other fields your token usually contains
        };

        const newToken = jwt.sign(
            updatedTokenPayload,
            process.env.SECRET_KEY, // Make sure you have this in your env variables
            { expiresIn: "7d" } // Set appropriate expiration
        );

        // Set the new token as an HTTP-only cookie
        const response = NextResponse.json({ 
            courseDetails, 
            studentProfile, 
            instructorProfile,
            newToken // Include the new token in response
        }, { status: 200 });

        response.cookies.set("authtoken", newToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;

    } catch (error) {
        // Handle unexpected errors
        console.error("Error enrolling student:", error);
        await session.abortTransaction();
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        session.endSession();
    }
}