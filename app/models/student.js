import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coursesEnrolled: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        progress: {
            type: Number,  // Progress as a percentage (0 to 100)
            default: 0
        },
        completionDate: Date,  // The date when a student completes a course
        completedQuizzes: [{
            quiz: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Quiz'
            },
            score: Number,
            completedAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    achievements: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        certificateUrl: String
    }],
    orderHistory: [{
        orderId: String,
        paymentId: String,
        status: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],    
});

const StudentProfile = mongoose.models.StudentProfile || mongoose.model('StudentProfile', studentProfileSchema);
export default StudentProfile;