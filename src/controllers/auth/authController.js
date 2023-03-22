import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../services/schemas/userShema.js";
import sendEmail from "../../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const registrationController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",

      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = new User({ email, avatarURL, verificationToken });

  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='${BASE_URL}/api/auth/verify/${verificationToken}' >Click to verify you email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      message: "Registration successful",
    },
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    _id: user.id,
  };

  const token = await jwt.sign(payload, process.env.SECRET, {
    expiresIn: "2d",
  });

  await User.findByIdAndUpdate(user._id, { token });

  return res.json({
    Status: "200 OK",
    "Content-Type": "application/json",
    ResponseBody: {
      token: token,
      user: {
        email: user.email,
        subscription: "starter",
      },
    },
  });
};

export const logoutController = async (req, res) => {
  console.log(req.logout);

  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });
  res.json({
    message: "Logout success response",
    Status: " 204 No Content",
  });
};

export const currentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    Status: " 200 OK",
    "Content-Type": "application/json",
    ResponseBody: {
      email,
      subscription,
    },
  });
};

export const subscriptionController = async (req, res) => {
  // const { _id } = req.user;
  // const { subscription } = req.body;

  await User.findByIdAndUpdate(req.user._id, {
    subscription: req.body.subscription,
  });

  res.json({ message: "ok" });
};
