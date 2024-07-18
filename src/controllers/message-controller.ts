import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";

import Message from "../models/message.js";
import ChatRoom from "../models/chatroom.js";

export const get_messages = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const messages = await Message.find({ chatroom: req.params.id }).populate(
        "user"
      );

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
  }
);

export const post_message = [
  body("message").isLength({ min: 1 }).withMessage("Enter a message").escape(),

  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    try {
      const chatroom = await ChatRoom.findById(req.params.id);

      const newMessage = new Message({
        message: req.body.message,
        user: req.user?._id,
        chatroom: req.params.id,
        date: Date.now(),
      });

      const message = await newMessage.save();
      chatroom!.last_message = newMessage.message;
      chatroom!.last_active = newMessage.date;
      await chatroom?.save();
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

export const upload_img = asyncHandler(async (req: Request, res: Response) => {
  let response = await cloudinary.uploader.upload(
    req.file?.path!,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: "Failed to upload",
        });
        return;
      }
      return result;
    }
  );

  try {
    const chatroom = await ChatRoom.findById(req.params.id);

    const newMessage = new Message({
      image: response.secure_url,
      user: req.user?._id,
      chatroom: req.params.id,
      date: Date.now(),
    });

    const message = await newMessage.save();
    chatroom!.last_message = newMessage.message;
    chatroom!.last_active = newMessage.date;
    await chatroom?.save();
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
});
