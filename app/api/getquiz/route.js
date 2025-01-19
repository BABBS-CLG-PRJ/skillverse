import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Quiz from "../../models/quiz";

export async function POST(req) {
    try {
        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        await connectToDatabase();
        const quizzes = await Quiz.find({ course: courseId });

        // Return empty array instead of 404 if no quizzes found
        return NextResponse.json({ 
            quizzes: quizzes || [] 
        }, { status: 200 });

    } catch (error) {
        console.error("Error in getQuiz route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}