import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect'
import User from "../../models/user";

export async function POST(req, res) {
    const { uid } = await req.json();
    try {
        await connectToDatabase();
        const user = await User.findById(uid);
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ method: "POST", error: error });
    }
}