import { connectToDatabase } from '../../utils/dbconnect';
import User from '../../models/user';
import StudentProfile from '../../models/student';
import InstructorProfile from '../../models/instructor';
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
        const userdata = await userdoc.save(); // save the document to the database
        // Check if role is Student and create a profile
        if (data.role === 'Student') {
            const studentProfile = new StudentProfile({ user: userdata._id });
            await studentProfile.save();
        }
        // Check if role is Instructor and create a profile
        if (data.role === 'Instructor') {
            const instructorProfile = new InstructorProfile({user: userdata._id});
            await instructorProfile.save();
        }
        return NextResponse.json({ succces: true, message: 'Registration Done Successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error })
    }
}