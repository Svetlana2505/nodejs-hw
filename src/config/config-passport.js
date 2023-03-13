import passport from "passport";
import passportJWT from "passport-jwt";
import * as dotenv from "dotenv";

import { User } from "../services/schemas/userShema.js";
dotenv.config();

const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new passportJWT.Strategy(params, async (payload, done) => {
    const user = await User.findOne({ _id: payload._id });

    if (!user) {
      return done(new Error("User not found"));
    }
    return done(null, user);
  })
);
