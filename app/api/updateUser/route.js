import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import { ObjectId } from 'mongodb';

export async function PATCH(req, res) {
    const { uid, firstName, lastName,email,bio } = await req.json();
    try {
        const db = await connectToDatabase();
        await db.collection('users').updateOne({ _id: new ObjectId(uid) }, { $set: { firstName: firstName, lastName: lastName, email: email, bio: bio } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user data" });
    }
}