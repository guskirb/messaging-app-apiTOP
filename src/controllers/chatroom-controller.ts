import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import ChatRoom from "../models/chatroom.js";

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
    try {
      const newChatRoom = new ChatRoom({
        name: req.body.name,
        users: [req.user?._id],
      });
      const chatRoom = await newChatRoom.save();

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
      const chatRoom = await ChatRoom.updateOne(
        { _id: req.params.id },
        { $push: { users: req.body.user } }
      );

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
      const chatRoom = await ChatRoom.updateOne(
        { _id: req.params.id },
        { $pull: { users: req.user?._id } }
      );

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
