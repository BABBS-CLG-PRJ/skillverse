import { connectToDatabase } from '../../utils/dbconnect';
import User from '../../models/user';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const user = await req.json(); // this line is very much important
    try {
        await connectToDatabase();
        const testuser = await User.create(user);
        return NextResponse.json({ testuser });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message })
    }
}