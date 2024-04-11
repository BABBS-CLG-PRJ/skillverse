import Course from '../../models/course'; // Import your Course model
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../utils/dbconnect';
export async function POST(req) {
    try {
        // Connect to the MongoDB database
        await connectToDatabase();
        const { searchTerm } = await req.json();

        // Split the search term into individual words
        const searchWords = searchTerm.toLowerCase().split(' ');

        // Create an array to store all matched courses
        let matchedCourses = [];

        // Iterate over each word in the search term and search for courses
        for (const word of searchWords) {
            // Perform a case-insensitive search for courses that match any of the tags, description, or title
            const courses = await Course.find({
                $or: [
                    { tags: { $in: [word] } }, // Match any tags
                    { description: { $regex: word, $options: 'i' } }, // Match description
                    { title: { $regex: word, $options: 'i' } } // Match title
                ]
            });

            // Add matched courses to the array
            matchedCourses = matchedCourses.concat(courses);
        }

        return NextResponse.json({ matchedCourses });
    } catch (error) {
        return NextResponse.json({'Failed to search for courses': error});
    }
}
