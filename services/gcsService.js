import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

const storage = new Storage({ keyFilename: process.env.GCS_KEYFILE });
const bucket = storage.bucket(process.env.GCS_BUCKET);

export const generateSignedUrl = async (filename, contentType) => {
  const file = bucket.file(`${Date.now()}-${filename}`);

  const [uploadUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 5 * 60 * 1000,
    contentType,
  });

  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  return { uploadUrl, publicUrl };
};
