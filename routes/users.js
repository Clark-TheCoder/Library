import express from "express";
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/library", (req, res) => {
  res.send("User library");
});

export default router;
