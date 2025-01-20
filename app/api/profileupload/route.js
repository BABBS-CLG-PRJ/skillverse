// app/api/upload/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const uid = formData.get('uid');

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64String}`;

        // Upload to Cloudinary with upload_preset and public_id
        const result = await cloudinary.uploader.upload(dataURI, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            public_id: uid
        });

        return NextResponse.json({ public_id: result.public_id, secure_url: result.secure_url });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}