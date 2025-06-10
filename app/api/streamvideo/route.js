// Import necessary modules and models
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Course from '../../models/course'; // Adjust the path based on your project structure
import { connectToDatabase } from '../../utils/dbconnect'; // Ensure you have a function to connect to your DB
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
import User from "../../models/user"

export async function POST(req) {
  try {

    // 1. Connect to the database first
    await connectToDatabase();

    // Parse the request body
    const { authToken, courseId, videoId } = await req.json();

    // Check if all required fields are provided
    if (!authToken || !courseId || !videoId) {
      return NextResponse.json({
        error: "Provide authToken, courseId, and videoId in the request body.",
      }, { status: 400 });
    }

    // Decode the authToken to get the user ID (uid)
    let decodedToken;
    try {
      decodedToken = jwt.verify(authToken, process.env.SECRET_KEY);
    } catch (jwtError) {
      return NextResponse.json({
        error: "Invalid or expired authToken.",
      }, { status: 401 });
    }

    const uid = decodedToken.userId;


    // =====================================
    // Check if the user is authorized
    // =====================================

    // Fetch the course with instructor and studentsEnrolled populated
    const course = await Course.findById(courseId)
      .populate('instructor')
      .populate('studentsEnrolled');

    // If course not found, throw an error
    if (!course) {
      return NextResponse.json({
        error: "Course with the provided courseId not found.",
      }, { status: 400 });
    }

    // Check if the user is the instructor
    const isInstructor = course.instructor._id.toString() === uid;

    // Check if the user is enrolled as a student
    const isEnrolled = course.studentsEnrolled.some(student => student._id.toString() === uid);

    // If the user is neither the instructor nor enrolled, deny access
    if (!isInstructor && !isEnrolled) {
      return NextResponse.json({
        error: "Access Denied.",
      }, { status: 403 });
    }

    // =====================================
    // Check if the videoId belongs to the course
    // =====================================

    // Initialize a flag to check video existence
    let videoFound = false;

    // Iterate through the curriculum to find the videoId
    for (const section of course.curriculum) {
      for (const lecture of section.lectures) {
        // Assuming videoId corresponds to the lecture's videoUrl
        if (lecture.videoUrl.toString() === videoId) {
          videoFound = true;
          break;
        }
      }
      if (videoFound) break;
    }

    // If the video is not found in the course, throw an error
    if (!videoFound) {
      return NextResponse.json({
        error: "videoId does not belong to courseId.",
      }, { status: 400 });
    }

    // =====================================
    // Generate the signed URL
    // =====================================

    // Construct the URL to sign
    const url = `${process.env.CLOUDFRONT_URL}${videoId}`;

    // The ID of the CloudFront key pair
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;

    // The private key in PEM format
    const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
    // const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY.replace(/\\n/g, '\n');

    // Validate CloudFront credentials
    if (!keyPairId || !privateKey) {
      return NextResponse.json({
        error: "CloudFront credentials are not properly configured.",
      }, { status: 500 });
    }

    // The expiration date and time of the URL
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12);

    // Sign the URL using CloudFront signer
    const signedUrl = await getSignedUrl({
      url: url,
      keyPairId: keyPairId,
      privateKey: privateKey,
      dateLessThan: expires,
    });



    // Send the signed URL as a successful response
    return NextResponse.json({
      success: true,
      expires: expires,
      signedUrl: signedUrl,
    }, { status: 200 });

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in POST /api/streamvideo:", error);

    // Determine the status and message
    const status = error.status || 500;
    const message = error.message || "Internal Server Error.";

    // Send an error response
    return NextResponse.json({
      error: message,
    }, { status });
  }
}
