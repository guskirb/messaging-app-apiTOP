import { Request, Response, NextFunction } from "express";
import ChatRoom from "../models/chatroom.js";

export const inChatRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chatroom = await ChatRoom.findById(req.params.id);

  // Check if user is in users array
  if (chatroom?.users.includes(req.user?._id as any)) {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }
};
