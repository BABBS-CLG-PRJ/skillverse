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

        const courses = await Course.find({ 
            title: { $regex: new RegExp(q, 'i') } // Use q in the regex query
        })
            .select('title _id') // Fetch only the title
            .limit(10); // Limit results for better performance

        return NextResponse.json(courses);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
