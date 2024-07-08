import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

import Message from "../models/message.js";

export const get_messages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chatroom: req.params.id });

    res.status(200).json({
      success: true,
      messages: messages,
    });
    return;
  } catch (err) {
    res.status(400).json({
      success: false,
      errors: err,
    });
    return;
  }
});

export const post_message = [
  body("message").isLength({ min: 1 }).withMessage("Enter a message").escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    try {
      const newMessage = new Message({
        message: req.body.message,
        user: req.user?._id,
        chatroom: req.params.id,
        date: new Date(),
      });

      const message = await newMessage.save();
      res.status(201).json({
        success: true,
        message: message,
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
