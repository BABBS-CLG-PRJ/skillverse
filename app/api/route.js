import { NextResponse } from 'next/server'
import { connectToDatabase } from '../utils/dbconnect'
export async function GET() {
  let db;
  try {
    db = await connectToDatabase();
    return NextResponse.json({ message: "Database Connection Successful", method: "GET" });
  } catch (error) {
    return NextResponse.json({ message: "Database Connection Failed", error: error.message });
  } finally {
    if (db && db.connection) {
      db.connection.close();
    }
  }
}