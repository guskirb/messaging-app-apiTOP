import asyncHandler from "express-async-handler";

import User from "../models/user.js";

export const get_users = asyncHandler(async (req, res) => {
  const users = await User.find().select("username join_date last_online").exec();

  res.status(200).json({
    success: true,
    users: users,
  });
  return;
});
