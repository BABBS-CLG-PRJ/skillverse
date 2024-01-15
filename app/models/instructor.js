import mongoose from "mongoose";

const instructorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coursesTaught: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    ratings: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        averageRating: {
            type: Number,
            default: 0
        }
    }],
    totalStudents: {
        type: Number,
        default: 0
    },
    socialLinks: {
        website: String,
        linkedIn: String,
        twitter: String
    }
});

const InstructorProfile = mongoose.models.InstructorProfile || mongoose.model('InstructorProfile', instructorProfileSchema);
export default InstructorProfile;