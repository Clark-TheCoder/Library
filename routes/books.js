import express from "express";
import {
  addBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} from "../controllers/books/bookController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
const router = express.Router();

router.get("/createBook", authenticateUser, (req, res) => {
  res.render("createBook");
});

router.post("/createBook", authenticateUser, addBook);

router.get("/getBooks", authenticateUser, getBooks);

router.delete("/deleteBook/:id", authenticateUser, deleteBook);

router.get("/updateBook/:id", authenticateUser, (req, res) => {
  res.render("updateBook");
});

router.patch("/updateBook/:id", authenticateUser, updateBook);

router.get("/book/:id", authenticateUser, getBook);

export default router;
