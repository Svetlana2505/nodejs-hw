import { Router } from "express";

import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { avatarController } from "../../controllers/avatarController.js";
import { auth } from "../../middlewares/authMiddlewares.js";
import { upload } from "../../middlewares/upload.js";
import { verifyController } from "../../controllers/auth/verifyController.js";
import { resendEmail } from "../../controllers/auth/resendEmail.js";
import {
  registrationController,
  loginController,
  currentController,
  logoutController,
  subscriptionController,
} from "../../controllers/auth/authController.js";

export const authRouter = new Router();

authRouter.get(
  "/verify/:verificationToken",
  auth,
  asyncWrapper(verifyController)
);
authRouter.post("/verify", auth, asyncWrapper(resendEmail));
authRouter.post("/signup", asyncWrapper(registrationController));
authRouter.post("/login", asyncWrapper(loginController));
authRouter.get("/current", auth, asyncWrapper(currentController));
authRouter.get("/logout", auth, asyncWrapper(logoutController));
authRouter.patch("/", auth, asyncWrapper(subscriptionController));
authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  asyncWrapper(avatarController)
);
