import { connectToDatabase } from '../../utils/dbconnect';
import ContactUs from '../../models/contact';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const contactData = await req.json(); // this line is very much important
    try {
        await connectToDatabase(); // connected to the database
        const contactdoc = new ContactUs(contactData);
        await contactdoc.save(); // save to database
        return NextResponse.json({ success: true, message: "Message Sent Successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message })
    }
}



