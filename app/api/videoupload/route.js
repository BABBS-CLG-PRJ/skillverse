var AWS = require('aws-sdk');
import { NextResponse } from 'next/server';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

async function uploadFileToS3 (file, fileName){
  
  const fileBuffer = file;
  console.log(fileName);

  var params = {
    Bucket: process.env.S3_BUCKET_NMAE,
    Key: fileName,
    Body: fileBuffer
  };

  var upload = new AWS.S3.ManagedUpload({
    partSize: 10 * 1024 * 1024,  // 10 MB
    params: params
  });

  upload.on('httpUploadProgress', function(evt) {
    console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
  });

  var result = await upload.promise();

  return result.Key;
}

export async function POST(request) {
  try{
    const formData = await request.formData();
    const file = formData.get("file");
    if(!file){
      return NextResponse.json({
        error: "Select a file"
      });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({
      success:true,
      fileName,
    });

  }catch(error){
    return NextResponse.json({
      error: "Error Uploading File : " + error
    })
  }
}
