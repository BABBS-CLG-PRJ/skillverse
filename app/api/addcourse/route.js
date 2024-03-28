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


export async function PUT(req, res) {
    try {
        // Connect to the MongoDB database
        await connectToDatabase();

        // Extract updated course details from the request body
        const { courseId, title, description, instructor, curriculum, price, imageUrl, tags } = await req.json();
        
        // Find the course by ID
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Update the course fields only if they are provided in the request body
        if (title) {
            course.title = title;
        }
        if (description) {
            course.description = description;
        }
        if (instructor) {
            course.instructor = instructor;
        }
        if (curriculum) {
            course.curriculum.push(curriculum);
        }
        if (price) {
            course.price = price;
        }
        if (imageUrl) {
            course.imageUrl = imageUrl;
        }
        if (tags) {
            course.tags = tags;
        }


        // Save the updated course to the database
        await course.save();

        return NextResponse.json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}