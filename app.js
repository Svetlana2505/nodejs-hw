import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

import { router } from "./src/routes/api/index.js";
import { errorHandler } from "./src/helpers/apiHelpers.js";
dotenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

export default app;
