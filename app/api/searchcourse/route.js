import Course from '../../models/course'; // Import your Course model
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../utils/dbconnect';

export async function POST(req) {
    try {
        const { q } = await req.json(); // Extract the "q" value from the request body
        if (!q) {
            return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
        }

        await connectToDatabase();

        // Perform a search across title, tags, and description
        const courses = await Course.find({ 
            $or: [  // Use $or to match any of the fields
                { title: { $regex: new RegExp(q, 'i') } },  // Search in title (case-insensitive)
                { tags: { $regex: new RegExp(q, 'i') } },   // Search in tags (case-insensitive)
                { description: { $regex: new RegExp(q, 'i') } }  // Search in description (case-insensitive)
            ]
        })
            .select('title _id') // Fetch only the title and _id
            .limit(10); // Limit results for better performance

        return NextResponse.json(courses);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
