import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";

export const lastOnline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        last_online: new Date(),
      });
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
};
