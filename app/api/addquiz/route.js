import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import Course from "../../models/course";
import User from "../../models/user";
import Quiz from "../../models/quiz";
import StudentProfile from "../../models/student";
import { createQuiz, attemptQuiz } from "./quiz-management/quizmanagement";

// export async function POST(req) {
//   try {
//       await connectToDatabase();
//       // All the quiz questions should be taken through request
//       // Sample quiz data
//       const sampleQuizQuestions = [
//           {
//               questionText: "What does HTML stand for?",
//               options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
//               correctAnswer: "Hyper Text Markup Language",
//               explanation: "HTML is the standard markup language for creating Web pages."
//           },
//           {
//               questionText: "Which of the following is NOT a JavaScript data type?",
//               options: ["String", "Boolean", "Float", "Undefined"],
//               correctAnswer: "Float",
//               explanation: "JavaScript has Number type for both integers and floating-point numbers. There's no separate Float type."
//           }
//       ];

//       const quizData = {
//           title: "Web Development Basics",
//           description: "Test your knowledge of HTML, CSS, and JavaScript",
//           questions: sampleQuizQuestions,
//           passingScore: 70
//       };

//       // Step 1: Get a sample course and instructor
//       const course = await Course.findOne();
//       if (!course) {
//           return NextResponse.json({ error: "No courses found" }, { status: 404 });
//       }

//       // Step 2: Create a quiz
//       let newQuiz;
//       try {
//           newQuiz = await createQuiz(course.instructor.toString(), course._id.toString(), quizData);
//       } catch (error) {
//           return NextResponse.json({ error: "Failed to create quiz: " + error.message }, { status: 500 });
//       }

//       // Step 3: Get a sample student
//       const student = await User.findOne({ role: 'Student' });
//       if (!student) {
//           return NextResponse.json({ error: "No student found" }, { status: 404 });
//       }

//       // Step 4: Simulate a quiz attempt
//       const score = 85; // Example score
//       try {
//           await attemptQuiz(student._id.toString(), course._id.toString(), newQuiz._id.toString(), score);
//       } catch (error) {
//           return NextResponse.json({ error: "Failed to record quiz attempt: " + error.message }, { status: 500 });
//       }

//       // Step 5: Verify the results
//       const updatedQuiz = await Quiz.findById(newQuiz._id).populate('studentAttempts.student');
//       const studentProfile = await StudentProfile.findOne({ user: student._id });

//       return NextResponse.json({
//           message: "Quiz test completed successfully",
//           quizCreated: newQuiz,
//           quizAttempted: updatedQuiz,
//           studentProfileUpdated: studentProfile
//       });

//   } catch (error) {
//       console.error("Error in test-quiz route:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


export async function POST(req) {
  try {
    await connectToDatabase();
    // Parse request body
    const { courseId, quizData, generate, numberOfQuestions, passingScore, attemptsAllowed } = await req.json();

    // Validate input
    if (!courseId || !quizData) {
      return NextResponse.json({ error: "Course ID and quiz data are required" }, { status: 400 });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Create the quiz
    let newQuiz;
    try {
      newQuiz = await createQuiz(courseId, quizData, generate, numberOfQuestions, passingScore, attemptsAllowed);
    } catch (error) {
      return NextResponse.json({ error: "Failed to create quiz: " + error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Quiz created successfully", quiz: newQuiz }, { status: 201 });
  } catch (error) {
    console.error("Error in addQuiz route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
