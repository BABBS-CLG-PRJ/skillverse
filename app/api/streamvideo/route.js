// import { NextResponse } from 'next/server';
import { NextResponse } from "next/server";

const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");

export async function GET(request) {
  try {
    const videoId = "658933e6a8fee3df1c57bbdf.mp4";
    // The URL to sign
    const url = `${process.env.CLOUDFRONT_URL}${videoId}`;

    // The ID of the CloudFront key pair
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;

    // The private key in PEM format
    const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;

    // The expiration date and time of the URL
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12);
    // Sign the URL
    const signedUrl = await getSignedUrl({
      url: url,
      keyPairId: keyPairId,
      privateKey: privateKey,
      dateLessThan: expires,
    });

    console.log("hello")
    console.log(signedUrl);
    // Send the signed URL as a response
    return NextResponse.json({
      success: true,
      signedUrl,
    })

  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      error: "Error Getting url : " + error
    })
  }
}