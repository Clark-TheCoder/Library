import express from "express";
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/add", (req, res) => {
  res.send("User library");
});

router.get("/library", (req, res) => {
  res.render("library");
});

export default router;
