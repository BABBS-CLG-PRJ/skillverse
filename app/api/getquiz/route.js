import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Quiz from "../../models/quiz";

export async function POST(req) {
    try {
        // Parse request body
        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Fetch all quizzes for the given courseId
        const quizzes = await Quiz.find({ course: courseId })
            .populate('course', 'title') // Populate course title (optional)
            .populate('studentAttempts.student', 'name email'); // Optional: populate student details

        if (!quizzes || quizzes.length === 0) {
            return NextResponse.json({ message: "No quizzes found for this course" }, { status: 404 });
        }

        return NextResponse.json({ quizzes }, { status: 200 });
    } catch (error) {
        console.error("Error in getQuiz route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
