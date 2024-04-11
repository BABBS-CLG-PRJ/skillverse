import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect'
import Course from "../../models/course";
export async function POST(req) {
    const { courseId } = await req.json();
    try {
        await connectToDatabase();
        const courseDetails = await Course.findOne({ _id: courseId });
        // console.log(courseDetails.reviews); // to get all the comments regarding the course 
        return NextResponse.json({ courseDetails });
    } catch (error) {
        return NextResponse.json({ method: "POST", error: error });
    }
}