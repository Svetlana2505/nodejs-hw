import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
// import sgMail from "@sendgrid/mail";

import { router } from "./src/routes/api/contactsRouter.js";
import { authRouter } from "./src/routes/api/authRouter.js";

import { errorHandler } from "./src/helpers/apiHelpers.js";
import "./src/config/config-passport.js";

dotenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);

// const mail = {
//   to: "svetikred77@gmail.com",
//   from: "svetikred77@gmail.com",
//   subject: "Как дела",
//   html: "Хорошо  прошли мои выходные ",
// };

// sgMail
//   .send(mail)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

export default app;
