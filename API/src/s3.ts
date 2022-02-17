import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"

const randomBytes = promisify(crypto.randomBytes)

const region = "us-east-1"
const bucketName = "theexpat"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

//setting s3 server
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  })
  
  export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
  
    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    console.log("TEST: ",accessKeyId)
    console.log("upload url:," ,uploadURL)
    return uploadURL
  }