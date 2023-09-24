import { NextResponse } from 'next/server'
import otpgenerator from 'otp-generator';
import nodemailer from 'nodemailer'
import OTP from '../../models/otp'
import { connectToDatabase } from '../../utils/dbconnect'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.PASSWORD
    }
});


export async function POST(req, res) {
    const { email } = await req.json();
    try {
        // Generate the otp
        const otp = otpgenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false });
        await connectToDatabase();
        // Search for the otpdocument
        const otpdocument = await OTP.findOne({ email: email });
        // if there is no otp document that means either the document is expired or it is created first time
        if (!otpdocument) {
            // Create a new OTP document
            const otpdocument = new OTP({
                email: email,
                otp: {
                    value: otp,
                    // createdAt will be automatically set to the current date due to the default value in your schema
                }
            });
            // Save the document
            await otpdocument.save(); // it will set 5 min expiry automatically in mongoose schema
            // Send the mail with OTP
            await transporter.sendMail({
                from: '"Skill Verse" <skillverse@gmail.com>',
                to: email,
                subject: "Your Skill Verse OTP",
                text: `Hello,

            Your One-Time Password (OTP) for Skill Verse is: ${otp}

            Please enter this OTP within the next 5 minutes to proceed. If you did not request this OTP, please ignore this email.

            Thank you for using Skill Verse!

            Best,
            The Skill Verse Team`,
                html: `
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for Skill Verse is: <strong>${otp}</strong></p>
            <p>Please enter this OTP within the next 5 minutes to proceed. If you did not request this OTP, please ignore this email.</p>
            <p>Thank you for using Skill Verse!</p>
            <p>Best,<br>The Skill Verse Team</p>`
            });
            return NextResponse.json({ success: true, message: 'OTP has been sent to your email', });
        }
        else {
            return NextResponse.json({ success: true, message: 'An OTP has already been dispatched to your email. Please wait for 5 minutes before requesting another.', });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}