import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

console.log("🔧 GCS Config:", {
  keyFile: process.env.GCS_KEYFILE,
  bucket: process.env.GCS_BUCKET,
  hasCredentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
});

// Configurazione storage con fallback per variabili d'ambiente
let storage;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  // Per hosting: credenziali da variabile d'ambiente
  const credentials = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  );
  storage = new Storage({
    projectId: credentials.project_id,
    keyFilename: undefined,
    credentials: credentials,
  });
} else {
  // Per sviluppo locale: file JSON
  storage = new Storage({ keyFilename: process.env.GCS_KEYFILE });
}

const bucket = storage.bucket(process.env.GCS_BUCKET);

export const generateSignedUrl = async (filename, contentType) => {
  try {
    console.log("📝 Generating signed URL for:", {
      filename,
      contentType,
      bucketName: bucket.name,
    });

    const file = bucket.file(`${Date.now()}-${filename}`);

    const [uploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 5 * 60 * 1000,
      contentType,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    console.log("✅ Signed URL generated successfully");
    return { uploadUrl, publicUrl };
  } catch (error) {
    console.error("❌ Error generating signed URL:", error.message);
    throw error;
  }
};
