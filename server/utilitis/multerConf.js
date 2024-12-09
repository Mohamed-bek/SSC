import multer from "multer";

import path from "path"; // Don't forget to import path if you're using it

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The destination folder for the uploaded files
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Get the file's original extension
    cb(null, file.fieldname + "-" + Date.now() + extname); // Append the extension to the filename
  },
});

// Create multer instance
export const upload = multer({ storage: storage });
