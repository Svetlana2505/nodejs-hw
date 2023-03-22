import { User } from "../../services/schemas/userShema.js";
import sendEmail from "../../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "missing required field email" });
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='${BASE_URL}/api/auth/verify/${user.verificationToken}' >Click to verify you email</a>`,
  };

  await sendEmail(mail);

  res.status(400, "Bad Reguest").json({
    message: "Verification has already been passed",
  });
};
