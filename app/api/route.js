import { NextResponse } from 'next/server'
import { connectToDatabase } from '../utils/dbconnect'

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: "Database Connection Successful", method: "GET" });
  } catch (error) {
    return NextResponse.json({ message: "Database Connection Failed", method: "GET" });
  }
}