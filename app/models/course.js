import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // pointing to the User schema
        required: true
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    curriculum: [{
        sectionTitle: {
            type: String,
            required: true
        },
        lectures: [{
            lectureTitle: {
                type: String,
                required: true
            },
            videoUrl: String,
            supplementaryMaterial: [String]  // could be links to slides, readings, etc.
        }]
    }],
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reviewText: String,
        rating: Number,  // individual ratings
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    price: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: ""  // placeholder for course thumbnail
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;