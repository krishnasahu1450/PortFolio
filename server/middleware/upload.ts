
import multer from "multer";
import path from "path";
import fs from "fs";
import { ObjectId } from "mongodb";

type UploadFolder = "projects" | "blogs" | "profiles";

export const uploadFiles = (folder: UploadFolder) => {
  const uploadPath = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const mongoId = new ObjectId().toHexString(); // 24 char hex id
      const ext = path.extname(file.originalname);  // .jpg / .png etc
      const uniqueName = `${mongoId}${ext}`;
      console.log(`Uploading file: ${file.originalname} as ${uniqueName}`);

      cb(null, uniqueName);
    },
  });

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  const fileFilter = (_req: any, file: any, cb: any) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only images, PDF, DOC, and DOCX files are allowed"
        ),
        false
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};
