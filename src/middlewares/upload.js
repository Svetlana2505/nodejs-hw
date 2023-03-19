import multer from "multer";
import path from "path";

const tempDir = path.resolve("./temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);

    // const [, extension] = file.originalname.split(".");

    // const filename = `${uuid()}.${extention}`;

    // cb(null, filename);
  },
});

export const upload = multer({ storage });
