import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import { ObjectId } from 'mongodb';

export async function POST(req, res) {
    // UserId can be passed from client side by reading the authtoken from localstorage and decode it by verifytoken API
    // It is needed for updating the mongoDB database with that particular user object id
    const { uid, url } = await req.json();
    try {
        const db = await connectToDatabase();
        await db.collection('users').updateOne({ _id: new ObjectId(uid) }, { $set: { imageUrl: url } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to upload image" });
    }
}