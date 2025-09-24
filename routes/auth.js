import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/auth/authController.js";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", signupUser);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
