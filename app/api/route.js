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

    // Add CORS headers to the response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    const response = NextResponse.json({
      message: "Database Connection Failed",
      error: error.message,
    });

    // Add CORS headers to the error response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } finally {
    if (db && db.connection) {
      db.connection.close();
    }
  }
}
