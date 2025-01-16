import { connectToDatabase } from '../../utils/dbconnect';
import User from '../../models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import StudentProfile from '../../models/student';
import InstructorProfile from '../../models/instructor';
import { cookies } from 'next/headers'

const secret = process.env.SECRET_KEY

const checkUser = async (email, password) => {
    try {
        const matchedUser = await User.findOne({ email: email });
        // Check if the user exists
        if (!matchedUser) {
            return { success: false, message: "User Not Found" };
        }
        const match = await bcrypt.compare(password, matchedUser.passwordHash);
        var profile = null;
        if (match) {
            if (matchedUser.role === 'Student') {
                profile = await StudentProfile.findOne({ user: matchedUser._id });
            }
            if (matchedUser.role === 'Instructor') {
                profile = await InstructorProfile.findOne({ user: matchedUser._id });
            }
            // token will be expired in 30 days
            const token = jwt.sign({ userObject: matchedUser, profileObject: profile }, secret, { expiresIn: '30d', algorithm: 'HS512' })
            cookies().set('authtoken', token, { 
                secure: true, 
                maxAge: 30 * 24 * 60 * 60, 
                path: '/', 
                sameSite: 'strict' 
            })
            return { success: true, message: "Login Successful", authtoken: token };
        } else {
            return { success: false, message: "Wrong Password", authtoken: false };
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