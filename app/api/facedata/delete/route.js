import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
    console.log("hit delete request");
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

        // Check if the image exists
        try {
            const headObjectParams = {
                Bucket: 'clg-prj',
                Key: s3Key,
            };
            await s3Client.send(new HeadObjectCommand(headObjectParams));
            console.log(`Image with uid ${uid} found, proceeding to delete it.`);
        } catch (err) {
            if (err.name === "NotFound") {
                console.log(`Image with uid ${uid} does not exist.`);
                return NextResponse.json({
                    success: false,
                    message: "Image does not exist.",
                });
            } else {
                throw err;
            }
        }

        // Delete the image from S3
        const deleteObjectParams = {
            Bucket: 'clg-prj', // S3 bucket name
            Key: s3Key, // The path and file name in S3
        };

        const deleteObjectCommand = new DeleteObjectCommand(deleteObjectParams);
        const deleteResponse = await s3Client.send(deleteObjectCommand);

        console.log("Delete success:", deleteResponse);

        // Send the success response
        return NextResponse.json({
            success: true,
            message: "Image deleted successfully.",
        });

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({
            success: false,
            error: "Error deleting image from S3: " + error.message,
        });
    }
}
