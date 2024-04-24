import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect'
import Course from "../../models/course";
import User from "../../models/user";
import InstructorProfile from '../../models/instructor';

export async function POST(req, res) {
    const { courseId } = await req.json();
    try {
        await connectToDatabase();
        const course = await Course.findById(courseId);
        const instructorId = course.instructor;
        const instructor = await InstructorProfile.findById(instructorId);
        const userId = await instructor.user;
        const user = await User.findById(userId);
        const name = user.firstName + " " + user.lastName;
        return NextResponse.json({ name });
    } catch (error) {
        return NextResponse.json({ method: "POST", error: error });
    }
}