import { NextResponse } from 'next/server'
import otpgenerator from 'otp-generator';
import nodemailer from 'nodemailer'
import OTP from '../../models/otp'
import { connectToDatabase } from '../../utils/dbconnect'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST_GMAIL,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER_GMAIL,
        pass: process.env.SMTP_PASSWORD
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
                html: `<div style="font-family: Helvetica,Arial,sans-serif;max-width:700px;width: 100%;margin: 0 auto;overflow:auto;line-height:2;background-color:#f6fff8;">
                <div style="margin:20px auto;width:90%;padding:20px 0;max-width:600px;">
                    <div style="border-bottom:1px solid #eee; background-color: #e59500; border-radius: 5px; text-align: center; padding: 10;">
                        <a href="" style="font-size:1.8em;color: black;text-decoration:none;font-weight:800;">Your Skillverse OTP</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>We received a request to verify your email address. <br/>Your verification code is:</p>
                    <h2 style="background: #e59500;margin: 20px auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">
                        This OTP is valid for 5 minutes.
                        <br/>
                        If you did not request this code, it is possible that someone else is trying to access your account. <br/><b>Do not forward or give this code to anyone.</b>
                        <br/>
                        <br/>
                        Sincerely yours,
                        <br/>
                        The Skillverse team
                    </p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>This email can't receive replies.</p>
                    </div>
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Skillverse</p>
                        <p>Kolkata</p>
                        <p>India</p>
                    </div>
                </div>
            </div>
            
            <style>
                @media (max-width: 480px) {
                    h2 {
                        font-size: 1.5em; /* Adjusting the font size for the OTP on smaller screens */
                    }
                }
            </style>                       
              `
            });
            return NextResponse.json({ success: true, message: 'OTP has been sent to your email', });
        }
        else {
            return NextResponse.json({ success: true, message: 'OTP sent to your email. Wait 5 minutes before requesting another.', });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}