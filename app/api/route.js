import { NextResponse } from 'next/server';
import { connectToDatabase } from '../utils/dbconnect';

export async function GET() {
  let db;
  try {
    db = await connectToDatabase();
    const response = NextResponse.json({
      message: "Database Connection Successful",
      method: "GET",
    });
    return response;
  } catch (error) {
    const response = NextResponse.json({
      message: "Database Connection Failed",
      error: error.message,
    });
    return response;
  } finally {
    if (db && db.connection) {
      db.connection.close();
    }
  }
}
