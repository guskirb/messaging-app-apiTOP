import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const verify = async (username: any, password: any, done: any) => {
  try {
    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (!user) {
      return done(null, false, {});
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, {});
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const serialize = (user: any, done: any) => {
  done(null, user.id);
};

const deserialize = async (id: any, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
