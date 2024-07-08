import { Router } from "express";
const router = Router({ mergeParams: true });

import { isAuth } from "../middleware/auth.js";
import { inChatRoom } from "../middleware/chatroom.js";
import {
  get_messages,
  post_message,
} from "../controllers/message-controller.js";

router.get("/", isAuth, inChatRoom, get_messages);

router.post("/", isAuth, inChatRoom, post_message);

export default router;
