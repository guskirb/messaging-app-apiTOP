import { Router } from "express";
const router = Router();
import passport from "passport";

import { register } from "../controllers/auth-controller.js";
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
import { isAuth, isUser } from "../middleware/auth.js";

router.get("/", get_users);

router.get("/me", isAuth, get_me);

router.get("/friends", isAuth, get_friends);

router.post("/register", register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/failed",
  })
);

router.get("/failed", function (req, res, next) {
  res.status(401).json({
    success: false,
    error: "Login failed",
  });
});

router.get("/:id", get_user);

router.post("/:id/add", isAuth, add_friend);

router.post("/:id/remove", isAuth, remove_friend);

router.post("/:id/upload", isAuth, isUser, upload.single("image"), upload_img);

export default router;
