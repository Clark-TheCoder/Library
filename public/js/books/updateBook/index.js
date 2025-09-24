import { getBookData } from "./loadBookData.js";
import { updateBook } from "./updateBook.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pathParts = window.location.pathname.split("/");
  const bookId = pathParts[pathParts.length - 1];

  // Get book data
  const book = await getBookData(bookId);

  if (!book || !book.bookData) {
    return;
  }

  // Get the form fields
  const form = document.getElementById("update_book_form");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const genre = document.getElementById("genre");
  const rating = document.getElementById("rating");
  const thoughts = document.getElementById("thoughts");

  // Fill book data into the fields
  title.value = book.bookData.title;
  author.value = book.bookData.author;
  genre.value = book.bookData.genre || "";
  rating.value = book.bookData.rating || "";
  thoughts.value = book.bookData.thoughts || "";

  // Sumbit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isUpdated = await updateBook(bookId);
    if (isUpdated) {
      window.location.href = "/users/library";
    }
  });
});
