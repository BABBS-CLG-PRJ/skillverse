/**
 * @fileoverview This module is responsible for handling password reset requests.
 * When a user has forgotten their password and requests a password reset, this script
 * will verify if the user exists, generate a password reset token, and send them a 
 * reset link via email.
 * 
 * @requires nodemailer - For sending emails.
 * @requires jwt - For creating and verifying tokens.
 * @requires {connectToDatabase} - A utility to connect to the database.
 * @requires User - The User model to interact with the database.
 * @requires {NextResponse} - Custom response handler for the Next.js server.
 * 
 * @environment SMTP_HOST - The host name for the SMTP server.
 * @environment SMTP_PORT - The port number for the SMTP server.
 * @environment SMTP_USER - The user for authenticating with the SMTP server.
 * @environment PASSWORD - The password for authenticating with the SMTP server.
 * @environment SECRET_KEY - The secret key used to sign JWTs.
 * @environment NEXT_PUBLIC_BASE_URL - The base URL for the application to construct the reset link.
 * 
 * @function POST
 * @async
 * @param {object} req - The request object containing the user's email.
 * @param {object} res - The response object to be sent back to the client.
 * @returns {object} NextResponse - The response object containing success/error message.
 * 
 * @throws Will throw an error if there's an issue connecting to the database, finding the user, 
 * or sending the email.
 * 
 * @example
 * 
 * To use this module:
 * 1. Ensure environment variables are set up.
 * 2. Make a POST request with the user's email.
 * 3. On success, the user will receive a password reset link via email.
 * 
 */

import { connectToDatabase } from '../../utils/dbconnect';
import User from '../../models/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

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
        await connectToDatabase();
        const user = await User.findOne({ email: email }).select('+passwordResetToken');
        if (!user) {
            return NextResponse.json({ error: "User not found" })
        }
        let resetToken;
        var alreadyGenerated = false;

        try {
            jwt.verify(user.passwordResetToken, process.env.SECRET_KEY);
            alreadyGenerated = true;
            resetToken = user.passwordResetToken;
        } catch (error) {
            // The token is invalid (likely expired) so we'll generate a new one below
            resetToken = jwt.sign(
                { id: user._id }, // payload
                process.env.SECRET_KEY,  // JWT secret
                { expiresIn: '10m' } // expiration of 10 minutes
            );
            user.passwordResetToken = resetToken;
            alreadyGenerated = false;
            await user.save({ validateBeforeSave: false });
        }
        // Now we need to generate a password reset link with this token
        const resetlink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/?token=${resetToken}`;
        // Now send the reset link to that email
        // send mail with defined transport object
        if (!alreadyGenerated) {
            await transporter.sendMail({
                from: '"Skill Verse" <skillverse@gmail.com>',
                to: email,
                subject: "Action Required: Reset Your Skill Verse Password",
                text: `Hello,
            
            You recently requested to reset your password for your Skill Verse account. 
            Click the link below or you can paste the link on the browser to reset password:
            
            ${resetlink}
            
            If you did not request a password reset, please ignore this email or reply to let us know. 
            For security reasons, this link will expire in 1 hour. Please do not share this link with anyone.
            
            If you suspect any suspicious activity on your account, please contact our support immediately.
            
            Thank you for using Skill Verse!
            
            Best,
            The Skill Verse Team`,
                html: `
            <p>Hello,</p>
            <p>You recently requested to reset your password for your Skill Verse account.</p>
            <p><a href="${resetlink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">Reset Password</a></p>
            <p>If you did not request a password reset, please ignore this email or reply to let us know. For security reasons, this link will expire in 1 hour. Please do not share this link with anyone.</p>
            <p>Thank you for using Skill Verse!</p>
            <p>Best,<br>The Skill Verse Team</p>`,
            });
        }

        if (alreadyGenerated) {
            return NextResponse.json({
                success: true,
                message: "A password reset link has previously been sent. A new request cannot be made within 10 minutes."
            });
        }
        return NextResponse.json({
            success: true,
            message: "A password reset link has been dispatched to your email address."
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message })
    }
}