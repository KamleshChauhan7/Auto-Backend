import axios from "axios";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { spacesClient } from "../../config/do_spaces.js";


export const uploadBufferToSpaces = async (buffer, mimeType, fileName) => {
  // Create a clean, unique file name to prevent overwriting
  const cleanFileName = fileName.replace(/\s+/g, '-').toLowerCase();
  const uniqueKey = `in/auto/vehicle/categories/${Date.now()}-${cleanFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: uniqueKey,
    Body: buffer,
    ContentType: mimeType,
    ACL: "public-read",
  });

  await spacesClient.send(command);

  // Return the public URL
  return `https://${process.env.DO_SPACES_BUCKET}.blr1.digitaloceanspaces.com/${uniqueKey}`;
};
