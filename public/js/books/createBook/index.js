import { createBook } from "./createBook.js";

document.addEventListener("DOMContentLoaded", () => {
  const createBookForm = document.getElementById("create_book_form");
  createBookForm.addEventListener("submit", createBook);
});
