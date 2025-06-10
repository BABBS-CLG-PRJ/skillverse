// Import necessary modules and models
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Course from '../../models/course';
import { connectToDatabase } from '../../utils/dbconnect';
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
import User from "../../models/user"

export async function POST(req) {
  console.log('Starting POST request to /api/streamvideo');
  try {
    // 1. Connect to the database first
    console.log('Attempting to connect to database...');
    await connectToDatabase();
    console.log('Database connection successful');

    // Parse the request body
    const { authToken, courseId, videoId } = await req.json();
    console.log('Request body:', { authToken: '***hidden***', courseId, videoId });

    // Check if all required fields are provided
    if (!authToken || !courseId || !videoId) {
      console.log('Missing required fields');
      return NextResponse.json({
        error: "Provide authToken, courseId, and videoId in the request body.",
      }, { status: 400 });
    }

    // Decode the authToken to get the user ID (uid)
    let decodedToken;
    try {
      decodedToken = await jwt.verify(authToken, process.env.SECRET_KEY);
      console.log("Decoded Token: ", decodedToken);
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError);
      return NextResponse.json({
        error: "Invalid or expired authToken.",
      }, { status: 401 });
    }
    // console.log("This is the user id: ", decodedToken);
    const uid = decodedToken.userObject._id;

    // Fetch the course
    console.log('Fetching course with ID:', courseId);
    const course = await Course.findById(courseId)
      .populate('instructor')
      .populate('studentsEnrolled');
    
    if (!course) {
      console.log('Course not found');
      return NextResponse.json({
        error: "Course with the provided courseId not found.",
      }, { status: 400 });
    }
    console.log('Course found:', course.title);

    // Check authorization
    console.log(course.studentsEnrolled);
    console.log(uid);
    const isInstructor = course.instructor._id.toString() === uid;
    const isEnrolled = course.studentsEnrolled.some(student => student._id.toString() === uid);
    console.log('Authorization check:', { isInstructor, isEnrolled });

    if (!isInstructor && !isEnrolled) {
      console.log('Access denied for user:', uid);
      return NextResponse.json({
        error: "Access Denied.",
      }, { status: 403 });
    }

    // Check video existence
    console.log('Checking video existence...');
    let videoFound = false;
    for (const section of course.curriculum) {
      for (const lecture of section.lectures) {
        if (lecture.videoUrl.toString() === videoId) {
          videoFound = true;
          console.log('Video found in curriculum');
          break;
        }
      }
      if (videoFound) break;
    }

    if (!videoFound) {
      console.log('Video not found in course');
      return NextResponse.json({
        error: "videoId does not belong to courseId.",
      }, { status: 400 });
    }

    // Generate signed URL
    console.log('Generating signed URL...');
    const url = `${process.env.CLOUDFRONT_URL}${videoId}`;
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;

    if (!keyPairId || !privateKey) {
      console.log('Missing CloudFront credentials');
      return NextResponse.json({
        error: "CloudFront credentials are not properly configured.",
      }, { status: 500 });
    }

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12);
    console.log('URL will expire at:', expires);

    const signedUrl = await getSignedUrl({
      url: url,
      keyPairId: keyPairId,
      privateKey: privateKey,
      dateLessThan: expires,
    });
    console.log('Signed URL generated successfully');

    return NextResponse.json({
      success: true,
      expires: expires,
      signedUrl: signedUrl,
    }, { status: 200 });

  } catch (error) {
    console.error("Detailed error in POST /api/streamvideo:", {
      message: error.message,
      stack: error.stack,
      status: error.status
    });

    const status = error.status || 500;
    const message = error.message || "Internal Server Error.";

    return NextResponse.json({
      error: message,
    }, { status });
  }
}
