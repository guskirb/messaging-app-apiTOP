import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

import ChatRoom from "../models/chatroom.js";
import Message from "../models/message.js";

export const get_chatrooms = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const chatRooms = await ChatRoom.find({ users: req.user?._id })
        .populate("users", "-password -email")
        .sort({ last_active: -1 });

      res.status(200).json({
        success: true,
        chatrooms: chatRooms,
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

export const create_chatroom = asyncHandler(
  async (req: Request, res: Response) => {
    const currChatroom = await ChatRoom.find({
      $and: [
        {
          users: [req.user?._id, req.body.user],
        },
        {
          users: { $size: 2 },
        },
      ],
    }).populate("users", "-password -email");

    if (currChatroom.length === 0) {
      try {
        const newChatRoom = new ChatRoom({
          name: req.body.name,
          users: [req.user?._id, req.body.user],
          last_active: Date.now(),
        });
        const chatRoom = await newChatRoom.save();
        const returnedChatroom = await ChatRoom.findById(chatRoom._id).populate(
          "users",
          "-password -email"
        );

        res.status(201).json({
          success: true,
          chatroom: returnedChatroom,
        });
        return;
      } catch (err) {
        res.status(400).json({
          success: false,
          errors: err,
        });
        return;
      }
    } else {
      res.status(201).json({
        success: true,
        chatroom: currChatroom[0],
      });
      return;
    }
  }
);

export const add_to_chatroom = asyncHandler(
  async (req: Request, res: Response) => {
    const chatroom = await ChatRoom.findById(req.params.id);

    // Check if user is already in users array
    if (chatroom?.users.includes(req.body.user)) {
      res.status(400).json({
        success: false,
        error: "User already in chatroom",
      });
      return;
    }

    try {
      const chatRoom = await ChatRoom.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { users: req.body.user } },
        { new: true }
      ).populate("users", "-password -email");

      res.status(201).json({
        success: true,
        chatroom: chatRoom,
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

export const leave_chatroom = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const chat = await ChatRoom.findById(req.params.id);
      // If chatroom is empty then delete chatroom & messages
      if (chat?.users.length === 1) {
        await Promise.all([
          ChatRoom.findByIdAndDelete(req.params.id),
          Message.deleteMany({ chatroom: req.params.id }),
        ]);

        res.status(200).json({
          success: true,
          msg: "Chatroom deleted",
        });
      } else {
        const chatRoom = await ChatRoom.updateOne(
          { _id: req.params.id },
          { $pull: { users: req.user?._id } }
        );

        res.status(200).json({
          success: true,
          chatroom: chatRoom,
        });
      }
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

export const pin_unpin_chatroom = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const chatRoom = await ChatRoom.findById(req.params.id);

      chatRoom!.pinned = !chatRoom?.pinned;

      const newChatRoom = await chatRoom?.save();

      res.status(200).json({
        success: true,
        chatroom: newChatRoom,
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

export const edit_chatroom_name = [
  body("name").isLength({ min: 1 }).withMessage("Enter a name").escape(),
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
      const updatedChatroom = await ChatRoom.findOneAndUpdate(
        { _id: req.params.id },
        { name: req.body.name },
        { new: true }
      ).populate("users", "-password -email");

      res.status(200).json({
        success: true,
        chatroom: updatedChatroom,
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
