import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect'
import Course from "../../models/course";

export async function POST(req, res) {
    try {
        await connectToDatabase();
        const courseList = await Course.find();
        return NextResponse.json({ courseList });
    } catch (error) {
        return NextResponse.json({ method: "POST", error: error });
    }
}