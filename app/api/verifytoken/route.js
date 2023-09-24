import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const {token} = await req.json(); // this line is very much important
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return NextResponse.json({ decodedToken });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message })
    }
}