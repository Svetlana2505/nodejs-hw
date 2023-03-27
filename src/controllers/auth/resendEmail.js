import { User } from "../../services/schemas/userShema.js";
import sendEmail from "../../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const resendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "missing required field email" });
    return;
  }

  const user = await User.findOne({ email });

  if (!user.verificationToken) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}' >Click to verify you email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};
