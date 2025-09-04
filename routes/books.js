import express from "express";
import { addBook } from "../controllers/books/bookController.js";
const router = express.Router();

router.get("/createBook", (req, res) => {
  res.render("createBook");
});

router.post("/createBook", addBook);

export default router;
