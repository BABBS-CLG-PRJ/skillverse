import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
    console.log("hit request");
    try {
        const { webcamImage, uid } = await req.json();

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

        // Prepare the parameters for the S3 upload
        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NMAE, // S3 bucket name
            Key: s3Key, // The path and file name in S3
            Body: Buffer.from(webcamImage, "base64"), // Convert the image to bytes
            ContentType: "image/png", // You can change the content type according to the image format
        };

        // Check if the image already exists
        try {
            const headObjectParams = {
                Bucket: process.env.S3_BUCKET_NMAE,
                Key: s3Key,
            };
            await s3Client.send(new HeadObjectCommand(headObjectParams));
            console.log(`Image with uid ${uid} already exists, replacing it.`);
        } catch (err) {
            if (err.name !== "NotFound") {
                throw err;
            }
            console.log(`Image with uid ${uid} does not exist, uploading a new image.`);
        }

        // Upload or replace the image in S3
        const putObjectCommand = new PutObjectCommand(uploadParams);
        const uploadResponse = await s3Client.send(putObjectCommand);

        console.log("Upload success:", uploadResponse);

        // Send the success response
        return NextResponse.json({
            success: true,
            message: "Image uploaded/replaced successfully.",
            s3Response: uploadResponse,
        });

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({
            success: false,
            error: "Error uploading image to S3: " + error.message,
        });
    }
}
