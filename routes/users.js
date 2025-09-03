import express from "express";
const router = express.Router();

router.get("/library", (req, res) => {
  res.send("User library");
});

export default router;
