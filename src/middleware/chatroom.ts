import ChatRoom from "../models/chatroom.js";

export const inChatRoom = async (req, res, next) => {
  const chatroom = await ChatRoom.findById(req.params.id);

  // Check if user is in users array
  if (chatroom?.users.includes(req.user._id)) {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }
};
