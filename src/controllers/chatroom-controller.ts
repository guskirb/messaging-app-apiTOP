import asyncHandler from "express-async-handler";
import ChatRoom from "../models/chatroom.js";

export const create_chatroom = asyncHandler(async (req, res) => {
  try {
    const newChatRoom = new ChatRoom({ users: [req.user._id] });
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
});

export const add_user_to_chatroom = asyncHandler(async (req, res) => {
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
});
