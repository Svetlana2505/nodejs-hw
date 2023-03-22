import { User } from "../../services/schemas/userShema.js";

export const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new Error("Not Found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    Status: "200 OK",
    ResponseBody: {
      message: "Verification successful",
    },
  });
};
