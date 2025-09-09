import express from "express";
import {
  addBook,
  getBooks,
  getBook,
  deleteBook,
} from "../controllers/books/bookController.js";
const router = express.Router();

router.get("/createBook", (req, res) => {
  res.render("createBook");
});

router.post("/createBook", addBook);

router.get("/getBooks", getBooks);

router.delete("/deleteBook/:id", deleteBook);

router.get("/updateBook/:id", (req, res) => {
  res.render("updateBook");
});

router.get("/book/:id", getBook);

export default router;
