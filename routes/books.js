import express from "express";
import {
  addBook,
  getBooks,
  deleteBook,
} from "../controllers/books/bookController.js";
const router = express.Router();

router.get("/createBook", (req, res) => {
  res.render("createBook");
});

router.post("/createBook", addBook);

router.get("/getBooks", getBooks);

router.delete("/deleteBook", deleteBook);

export default router;
