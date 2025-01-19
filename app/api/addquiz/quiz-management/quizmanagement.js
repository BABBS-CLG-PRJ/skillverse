import mongoose from 'mongoose';
import Course from '../../../models/course';
import Quiz from '../../../models/quiz';
import StudentProfile from '../../../models/student';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const questionSchema = {
  description: "Quiz questions",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      questionText: {
        type: SchemaType.STRING,
        description: "Text of the quiz question",
        nullable: false,
      },
      options: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
          description: "Possible answers",
          nullable: false,
        },
      },
      correctAnswer: {
        type: SchemaType.STRING,
        description: "Correct answer to the question",
        nullable: false,
      },
      explanation: {
        type: SchemaType.STRING,
        description: "Explanation for the correct answer",
        nullable: true,
      },
    },
    required: ["questionText", "options", "correctAnswer"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: questionSchema,
  },
});

async function generateQuiz(title, description, courseId, topic, numberOfQuestions, passingScore, attemptsAllowed) {
  try {
    const result = await model.generateContent(
      `Generate a quiz with ${numberOfQuestions} multiple-choice questions on ${topic}.`
    );
    
    if (!result.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid AI response format");
    }

    const jsonString = result.response.candidates[0].content.parts[0].text;
    let questions;
    
    try {
      questions = JSON.parse(jsonString);
    } catch (parseError) {
      throw new Error("Failed to parse AI-generated questions: " + parseError.message);
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid questions format received from AI");
    }

    const quiz = new Quiz({
      title,
      description,
      course: courseId,
      questions,
      passingScore,
      attemptsAllowed,
    });

    return quiz;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}

async function createQuiz(courseId, quizData, generate = false, numberOfQuestions = 5, passingScore = null, attemptsAllowed = 2) {
  // If passing score isn't provided, default to numberOfQuestions - 1
  const finalPassingScore = passingScore ?? (numberOfQuestions - 1);
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    let newQuiz;

    if (generate) {
      // Generate quiz and save it within the transaction
      newQuiz = await generateQuiz(
        quizData.title, 
        quizData.description, 
        courseId, 
        quizData.topic, 
        numberOfQuestions, 
        finalPassingScore, 
        attemptsAllowed
      );
    } else {
      // Create the quiz with provided data
      newQuiz = new Quiz({
        ...quizData,
        course: courseId
      });
      await newQuiz.save({ session });
    }

    // Update the course with the new quiz
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { quizzes: newQuiz._id } },
      { session }
    );

    await session.commitTransaction();
    return newQuiz;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

async function attemptQuiz(studentId, courseId, quizId, score) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update the Quiz model with the student's attempt
    await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          studentAttempts: {
            student: studentId,
            score: score,
          }
        }
      },
      { session }
    );

    // Update the StudentProfile model
    await StudentProfile.findOneAndUpdate(
      {
        user: studentId,
        'coursesEnrolled.course': courseId
      },
      {
        $push: {
          'coursesEnrolled.$.completedQuizzes': {
            quiz: quizId,
            score: score
          }
        }
      },
      { session }
    );

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export { createQuiz, attemptQuiz };