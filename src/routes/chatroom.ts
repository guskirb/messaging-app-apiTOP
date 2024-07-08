import { Router } from "express";
const router = Router();
import passport from "passport";

import { isAuth } from "../middleware/auth.js";
import {
  create_chatroom,
  add_user_to_chatroom,
} from "../controllers/chatroom-controller.js";

router.post("/create", isAuth, create_chatroom);

router.post("/:id/add-user", isAuth, add_user_to_chatroom);

export default router;
