import { Router } from "express";

import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { auth } from "../../middlewares/authMiddlewares.js";

import {
  registrationController,
  loginController,
  currentController,
  logoutController,
  subscriptionController,
} from "../../controllers/authController.js";

export const authRouter = new Router();

authRouter.post("/signup", asyncWrapper(registrationController));
authRouter.post("/login", asyncWrapper(loginController));
authRouter.get("/current", auth, asyncWrapper(currentController));
authRouter.get("/logout", auth, asyncWrapper(logoutController));
authRouter.patch("/", auth, asyncWrapper(subscriptionController));
