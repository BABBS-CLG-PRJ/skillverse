// Import necessary modules
import { NextResponse } from 'next/server';
import {connectToDatabase} from '../../utils/dbconnect';
import Course from '../../models/course';

export async function POST(req, res) {

    try {
        // Connect to the MongoDB database
        await connectToDatabase();

        // Extract course details from the request body
        const { title, description, instructor, curriculum, price, imageUrl, tags } = await req.json();

        // Create a new course
        const newCourse = new Course({
            title,
            description,
            instructor,
            curriculum,
            price,
            imageUrl,
            tags
        });

        // Save the new course to the database
        await newCourse.save();

        return NextResponse.json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}
