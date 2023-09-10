import { connectToDatabase } from '../../utils/dbconnect';
import User from '../../models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const checkUser = async (email, password) => {
    try {
        const matchedUser = await User.findOne({ email: email });
        // Check if the user exists
        if (!matchedUser) {
            return { success: false, message: "User not found" };
        }
        const match = await bcrypt.compare(password, matchedUser.passwordHash);
        if (match) {
            return { success: true, message: "Login successful" };
        } else {
            return { success: false, message: "Wrong password" };
        }
    } catch (error) {
        console.error("Error during user check:", error);
    }
}

export async function POST(req, res) {
    const user = await req.json(); // this line is very much important
    try {
        await connectToDatabase();
        const result = await checkUser(user.email, user.password);
        return NextResponse.json({ result });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message })
    }
}



