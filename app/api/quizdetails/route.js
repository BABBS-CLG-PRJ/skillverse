import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Quiz from "../../models/quiz";

export async function POST(req) {
    try {
        // Parse request body
        const { quizId } = await req.json();

        if (!quizId) {
            return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Fetch all quiz details for the given quiz id
        const quizDetails = await Quiz.findById(quizId);

        if (quizDetails.length == 0) {
            return NextResponse.json({ message: "No quizz questions found for this quiz" }, { status: 404 });
        }

        return NextResponse.json({ quizDetails }, { status: 200 });
    } catch (error) {
        console.error("Error in quizdetails route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
