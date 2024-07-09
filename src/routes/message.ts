import { Router } from "express";
const router = Router({ mergeParams: true });
import passport from "passport";

import { inChatRoom } from "../middleware/chatroom.js";
import {
  get_messages,
  post_message,
} from "../controllers/message-controller.js";

router.get("/", passport.authenticate("jwt", { session: false }), inChatRoom, get_messages);

router.post("/", passport.authenticate("jwt", { session: false }), inChatRoom, post_message);

export default router;
