import mongoose from "mongoose";

export const connection = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_URL);
};
