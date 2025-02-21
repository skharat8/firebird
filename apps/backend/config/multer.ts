import multer from "multer";

const MAX_FILE_SIZE = 500 * 1024; // 500 KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Multer is used to parse multipart/form-data and store incoming file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },

  fileFilter(_, file, callback) {
    if (file.mimetype === "" || ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      // Accept this file type
      callback(null, true);
    } else {
      // Reject this file type
      callback(
        new Error(
          "Invalid file type. Only jpeg, jpg, png, and webp types are supported.",
        ),
      );
    }
  },
});

export default upload;
