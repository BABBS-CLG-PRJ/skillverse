import { NextResponse } from 'next/server'
import OTP from '../../models/otp';
import User from '../../models/user';
import { connectToDatabase } from '../../utils/dbconnect'

export async function POST(req) {
    const { otp, email } = await req.json();
    try {
        // Connect to database
        await connectToDatabase();
        // Search for the OTP document
        const otpdocument = await OTP.findOne({ email: email });
        // If OTP document present
        if (otpdocument) {
            // Case 1: Right OTP
            if (otpdocument.otp.value === otp) {
                const user = await User.findOne({ email: email });
                user.verified = true; // set as a verified user
                await user.save();
                return NextResponse.json({ success: true, message: 'Correct OTP' });
            }
            // Case 2: Wrong OTP
            return NextResponse.json({ success: false, message: 'Wrong OTP' });
        }
        // Else OTP document is expired
        // Case 3: OTP is given after expiration
        return NextResponse.json({ success: false, message: 'OTP Expired. Generate a new one.' });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}