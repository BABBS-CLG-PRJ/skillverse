// navigate to the services folder to get the helper functions
import mongoose from "mongoose";

// Schema for each quiz question
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    explanation: String  // Optional field to explain the answer
});

// Schema for storing student attempts
const studentAttemptSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',  // Assuming you have a StudentProfile model
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// Main schema for the quiz
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    questions: [questionSchema],  // Embedding the question schema
    passingScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    attemptsAllowed: {
        type: Number,
        default: 1
    },
    studentAttempts: [studentAttemptSchema],  // Embedding the student attempt schema
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;
