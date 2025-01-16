import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log("hit request");
    try {
        const { uid } = await req.json();

        // Create an instance of the S3 client
        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            },
        });

        // Define the S3 key (path and file name)
        const s3Key = `${process.env.S3_FACEDATA_FOLDER}/${uid}.png`;
        const s3Bucket = `${process.env.S3_BUCKET_NMAE}`;


        // Prepare the parameters for the S3 headObject command
        const checkParams = {
            Bucket: s3Bucket, // S3 bucket name
            Key: s3Key, // The path and file name in S3
        };

        // Check if the file exists in the S3 bucket
        try {
            await s3Client.send(new HeadObjectCommand(checkParams));
            // If the file exists, return a success response
            return NextResponse.json({
                exists: true,
                success: true,
                message: "Face Data exists for this User",
            });
        } catch (error) {
            if (error.name === 'NotFound') {
                // If the file does not exist, return a response indicating that
                return NextResponse.json({
                    exists: false,
                    success: true,
                    message: "Face Data does not exist for this User",
                });
            } else {
                // If there's another error, throw it
                throw error;
            }
        }

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({
            success: false,
            error: "Error checking S3 for face data: " + error.message,
        });
    }
}
