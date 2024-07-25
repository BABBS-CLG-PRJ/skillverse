import { NextResponse } from 'next/server';
import Course from '../../models/course';
import {connectToDatabase} from '../../utils/dbconnect';
import axios from 'axios';

export async function POST(req) {
    
    const { studentId, commentText, rating, courseId } = await req.json();
    try {
        await connectToDatabase();
        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const response = await axios.post('https://jsonspampred.vercel.app/predict', {'comment': commentText});
        const is_spam = response.data.result;
        // if it is not a spam comment then post it to the server
        if(!is_spam) {
            // Create a new comment
            const newComment = {
                student: studentId,
                reviewText: commentText,
                rating: rating,
                createdAt: new Date()
            };
    
            // Add the comment to the course's reviews array
            course.reviews.push(newComment);
    
            // Update the course's rating based on the new comment
            const totalRatings = course.reviews.reduce((sum, review) => sum + review.rating, 0);
            course.rating = totalRatings / course.reviews.length;
    
            // Save the updated course
            await course.save();
    
            return NextResponse.json({ is_spam: is_spam, message: 'Comment posted successfully', comment: newComment });
        }
        return NextResponse.json({ is_spam: is_spam, message: 'Spam comment is not allowed' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
