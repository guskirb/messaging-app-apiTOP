import { Router } from "express";
const router = Router();
import passport from "passport";

import messageRouter from "./message.js";
import { inChatRoom } from "../middleware/chatroom.js";
import {
  get_chatrooms,
  create_chatroom,
  add_to_chatroom,
  leave_chatroom,
} from "../controllers/chatroom-controller.js";

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  get_chatrooms
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  create_chatroom
);

router.post(
  "/:id/add-user",
  passport.authenticate("jwt", { session: false }),
  inChatRoom,
  add_to_chatroom
);

router.post(
  "/:id/leave",
  passport.authenticate("jwt", { session: false }),
  inChatRoom,
  leave_chatroom
);

router.use("/:id/messages", messageRouter);

export default router;
