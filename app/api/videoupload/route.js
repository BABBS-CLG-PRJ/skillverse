var AWS = require('aws-sdk');
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../utils/dbconnect';
import Video from '@/app/models/video';



AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

async function uploadFileToS3(file, fileName, filenameExtension) {

  const fileBuffer = file;
  console.log(fileName);

  var params = {
    Bucket: process.env.S3_BUCKET_NMAE,
    Key: fileName + '.' + filenameExtension,
    Body: fileBuffer
  };

  var upload = new AWS.S3.ManagedUpload({
    partSize: 10 * 1024 * 1024,  // 10 MB
    params: params
  });

  upload.on('httpUploadProgress', function (evt) {
    console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
  });

  var result = await upload.promise();

  return result.Key;
}
async function getVideoId(fileName, fileType) {
  connectToDatabase();
  const videodoc = new Video({
    name: fileName,
    type: fileType
  });
  const videoData = await videodoc.save();
  const videoId = videoData._id;
  console.log(videoId);
  return videoId;
}
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({
        error: "Select a file"
      });
    }
    const filenameExtension = file.name.split(".").pop();
    const allowedVideoExtensions = ["mp4", "avi", "mkv", "mov"];
    if (!allowedVideoExtensions.includes(filenameExtension.toLowerCase())) {
      return NextResponse.json({
        error: "Select a video file"
      });
    }
    const videoId = await getVideoId(file.name, file.type);
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, videoId, filenameExtension);

    return NextResponse.json({
      success: true,
      fileName,
    });

  } catch (error) {
    return NextResponse.json({
      error: "Error Uploading File : " + error
    })
  }
}
