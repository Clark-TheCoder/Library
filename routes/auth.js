import express from "express";
import { signupUser } from "../controllers/auth/authController.js";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", signupUser);

router.get("/login", (req, res) => {
  res.send("Login Page");
});

export default router;
