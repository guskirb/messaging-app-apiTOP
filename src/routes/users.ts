import { Router } from "express";
const router = Router();
import passport from "passport";

import { register } from "../controllers/auth-controller.js";
import { get_users } from "../controllers/users-controller.js";

router.get("/", get_users);

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

export default router;
