import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

import { User } from "../services/schemas/userShema.js";

const avatarDir = path.resolve("./public/avatars");

export const avatarController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();

  const filename = `${req.user._id}.${extention}`;
  const resultUpload = path.join(avatarDir, filename);

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(resultUpload);
  });

  await fs.rename(tempUpload, resultUpload);
  // fs.unlink(tempUpload, () => {});
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(req.user._id, avatarURL);

  res.json({
    Status: "200 OK",
    "Content-Type": "application/json",
    ResponseBody: {
      avatarURL,
    },
  });
};
