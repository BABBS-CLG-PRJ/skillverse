import { connectToDatabase } from '../../utils/dbconnect';
import User from '../../models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function POST(req, res) {
    const data = await req.json();
    try {
        await connectToDatabase();
        // Create a new User document
        const userdoc = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            passwordHash: await hashPassword(data.password),
            role: data.role,
            verified: data.verified,
        });
        await userdoc.save(); // save the document to the database
        return NextResponse.json({ userdoc });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message })
    }
}