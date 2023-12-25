import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req) {
    const videoId = "658933e6a8fee3df1c57bbdf.mp4";
    const cloudFrontUrl = process.env.CLOUDFRONT_URL;
    const videoUrl = `${cloudFrontUrl}${videoId}`;

    const response = await fetch(videoUrl);
    const { headers } = response;
    const videoStream = response.body;

    return new NextResponse(videoStream, {
        status: response.status,
        headers: {
            'Content-Length': headers.get('Content-Length'),
            'Content-Type': headers.get('Content-Type'),
        },
    });
}
