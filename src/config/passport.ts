import "dotenv/config";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../models/user.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN,
};

const strategy = new JwtStrategy(options as any, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.sub });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(strategy);
