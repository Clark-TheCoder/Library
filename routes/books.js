import express from "express";
const router = express.Router();

router.get("/createBook", (req, res) => {
  res.render("createBook");
});

export default router;
