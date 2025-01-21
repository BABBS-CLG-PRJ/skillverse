// Import necessary modules
import { NextResponse } from "next/server";
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");

// Environment variables should be set in your `.env` file
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;
const CLOUDFRONT_KEY_PAIR_ID = process.env.CLOUDFRONT_KEY_PAIR_ID;
const CLOUDFRONT_PRIVATE_KEY = process.env.CLOUDFRONT_PRIVATE_KEY;

export async function POST(req) {
  try {
    // Parse the request body
    const { videoId } = await req.json();

    // Check if required fields are provided
    if (!videoId) {
      return NextResponse.json(
        { error: "Provide videoId in the request body." },
        { status: 400 }
      );
    }

    // Construct the URL to sign
    const url = `${CLOUDFRONT_URL}${videoId}`;

    // Validate CloudFront credentials
    if (!CLOUDFRONT_KEY_PAIR_ID || !CLOUDFRONT_PRIVATE_KEY) {
      return NextResponse.json(
        { error: "CloudFront credentials are not properly configured." },
        { status: 500 }
      );
    }

    // Set the expiration date for the signed URL
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12 hours

    // Generate the signed URL using CloudFront
    const signedUrl = await getSignedUrl({
      url: url,
      keyPairId: CLOUDFRONT_KEY_PAIR_ID,
      privateKey: CLOUDFRONT_PRIVATE_KEY,
      dateLessThan: expires,
    });

    // Respond with the signed URL
    return NextResponse.json(
      {
        success: true,
        signedUrl,
        expires,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/streamvideo:", error);

    // Respond with the error message
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error.",
      },
      { status: error.status || 500 }
    );
  }
}
