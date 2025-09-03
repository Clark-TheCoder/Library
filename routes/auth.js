import express from "express";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.send("Login Page");
});

export default router;
