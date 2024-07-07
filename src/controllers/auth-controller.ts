import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import User from "../models/user.js";

export const register = [
  body("username", "Username is required")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      const user = await User.findOne({ username: value }).exec();
      if (user) {
        throw new Error("Username already in use");
      }
    })
    .escape(),
  body("email", "Email is required")
    .trim()
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value }).exec();
      if (user) {
        throw new Error("Email already in use");
      }
    })
    .escape(),
  body("password", "Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must contain at least 5 characters")
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        join_date: new Date(),
        last_online: new Date(),
      });

      const user = await newUser.save();
      res.status(201).json({
        success: true,
        user: user,
      });
      return;
    } catch (err) {
      res.status(400).json({
        success: false,
        errors: err,
      });
      return;
    }
  }),
];