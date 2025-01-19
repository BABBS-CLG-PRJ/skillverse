import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import Course from "../../models/course";
import User from "../../models/user";
import InstructorProfile from '../../models/instructor';
import { Types } from "mongoose";

export async function POST(req) {
    try {
        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Get the instructor ID
        const instructorId = course.instructor;
        if (!instructorId) {
            return NextResponse.json({ error: "Instructor not assigned to this course" }, { status: 404 });
        }

        // Find the instructor profile
        const instructor = await InstructorProfile.findOne({ user: new Types.ObjectId(instructorId) });
        if (!instructor) {
            return NextResponse.json({ error: "Instructor profile not found" }, { status: 404 });
        }

        // Find the user details
        const user = await User.findById(instructor.user);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get the instructor's name
        const name = `${user.firstName} ${user.lastName}`;
        return NextResponse.json({ name }, { status: 200 });

    } catch (error) {
        console.error("Error fetching instructor details:", error);
        return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
    }
}
