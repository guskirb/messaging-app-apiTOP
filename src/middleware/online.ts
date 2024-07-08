import User from "../models/user.js";

export const lastOnline = async (req, res, next) => {
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
