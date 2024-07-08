import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.js";

export const get_users = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select(
      "username join_date last_online image"
    );

    res.status(200).json({
      success: true,
      users: users,
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

export const get_user = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "username join_date last_online image"
    );

    res.status(200).json({
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
});

export const get_friends = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "username join_date last_online image"
    );

    res.status(200).json({
      success: true,
      friends: user.friends,
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

export const add_friend = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user?.friends.includes(req.params.id)) {
    res.status(400).json({
      success: false,
      error: "User already a friend",
    });
    return;
  }

  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { $push: { friends: req.params.id } }
    );

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
});

export const remove_friend = asyncHandler(async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { $pull: { friends: req.params.id } }
    );

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
});

export const upload_img = asyncHandler(async (req, res) => {
  let response = await cloudinary.uploader.upload(
    req.file.path,
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
    const user = await User.findByIdAndUpdate(req.params.id, {
      image: response.secure_url,
    });

    res.status(200).json({
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
});
