import { Router } from "express";
const router = Router();
import passport from "passport";

import { register, log_in } from "../controllers/auth-controller.js";
import { upload } from "../config/multer.js";
import {
  get_users,
  get_user,
  get_me,
  get_friends,
  add_friend,
  remove_friend,
  upload_img,
} from "../controllers/users-controller.js";
import { isUser } from "../middleware/auth.js";

router.get("/", get_users);

router.get("/me", passport.authenticate("jwt", { session: false }), get_me);

router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  get_friends
);

router.post("/register", register);

router.post("/login", log_in);

router.get("/failed", function (req, res, next) {
  res.status(401).json({
    success: false,
    error: "Login failed",
  });
});

router.get("/:id", get_user);

router.post("/:id/add", passport.authenticate("jwt", { session: false }), add_friend);

router.post("/:id/remove", passport.authenticate("jwt", { session: false }), remove_friend);

router.post("/:id/upload", passport.authenticate("jwt", { session: false }), isUser, upload.single("image"), upload_img);

export default router;
