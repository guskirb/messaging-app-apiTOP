import { Router } from "express";
const router = Router();
import passport from "passport";

import messageRouter from "./message.js";
import { isAuth } from "../middleware/auth.js";
import { inChatRoom } from "../middleware/chatroom.js";
import {
  get_chatrooms,
  create_chatroom,
  add_to_chatroom,
  leave_chatroom,
} from "../controllers/chatroom-controller.js";

router.get("/all", isAuth, get_chatrooms);

router.post("/create", isAuth, create_chatroom);

router.post("/:id/add-user", isAuth, inChatRoom, add_to_chatroom);

router.post("/:id/leave", isAuth, inChatRoom, leave_chatroom);

router.use("/:id/messages", messageRouter);

export default router;
