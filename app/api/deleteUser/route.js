import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import { ObjectId } from 'mongodb';

export async function DELETE(req, res) {
    const { uid } = await req.json();
    try {
        const db = await connectToDatabase();
        await db.collection('users').deleteOne({ _id: new ObjectId(uid) });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" });
    }
}