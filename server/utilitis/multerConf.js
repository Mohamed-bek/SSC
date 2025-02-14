// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// // Define the equivalent of __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define the uploads directory
// const UPLOADS_DIR = path.join(__dirname, "uploads");

// // Ensure the uploads directory exists
// if (!fs.existsSync(UPLOADS_DIR)) {
//   fs.mkdirSync(UPLOADS_DIR, { recursive: true });
// }

// // Set up storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, UPLOADS_DIR); // Use the defined uploads directory
//   },
//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname); // Get the file's original extension
//     cb(null, file.fieldname + "-" + Date.now() + extname); // Append the extension to the filename
//   },
// });

// // Create and export the multer instance
// export const upload = multer({ storage: storage });
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3"; // Import multer-s3

// Initialize S3
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint("https://nyc3.digitaloceanspaces.com"), // Update for DigitalOcean Spaces or use AWS S3 endpoint
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set your AWS access key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set your AWS secret access key
  region: "us-east-1", // Use your bucket's region (if using AWS S3)
});

// Set up multer with s3 storage
const storage = multerS3({
  s3: s3,
  bucket: "your-bucket-name", // Set your bucket name
  acl: "public-read", // Set access control (public-read for public files)
  key: (req, file, cb) => {
    cb(null, `uploads/${Date.now()}-${file.originalname}`); // Store in the 'uploads' folder within the bucket
  },
});

// Create and export multer instance
export const upload = multer({ storage: storage });
