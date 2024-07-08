import { Router } from "express";
const router = Router();
import passport from "passport";

import { isAuth } from "../middleware/auth.js";
import { inChatRoom } from "../middleware/chatroom.js";
import {
  create_chatroom,
  add_to_chatroom,
  leave_chatroom,
} from "../controllers/chatroom-controller.js";

router.post("/create", isAuth, create_chatroom);

router.post("/:id/add-user", isAuth, inChatRoom, add_to_chatroom);

router.post("/:id/leave", isAuth, inChatRoom, leave_chatroom);

export default router;
