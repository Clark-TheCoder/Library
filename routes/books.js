import express from "express";
const router = express.Router();

router.get("/createBook", (req, res) => {
  res.render("createBook");
});

router.post("/createBook", addBook);

export default router;
