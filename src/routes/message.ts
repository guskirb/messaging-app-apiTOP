import { Router } from "express";
const router = Router({ mergeParams: true });
import passport from "passport";

import { upload } from "../config/multer.js";

import { inChatRoom } from "../middleware/chatroom.js";
import {
  get_messages,
  post_message,
  upload_img,
} from "../controllers/message-controller.js";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  inChatRoom,
  get_messages
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  inChatRoom,
  post_message
);

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  upload_img
);

export default router;
