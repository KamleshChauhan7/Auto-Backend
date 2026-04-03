import { S3Client } from "@aws-sdk/client-s3";

export const spacesClient = new S3Client({
    region: process.env.DO_SPACES_REGION,   
    endpoint: process.env.DO_SPACES_ENDPOINT,
    forcePathStyle: true, // important for DO
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});