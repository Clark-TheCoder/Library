import { createBookUI } from "./createBookUI.js";
import { loadBooksIntoLibrary } from "./getLibraryBooks.js";
import { selectBookFromLibrary } from "./selectBook.js";

document.addEventListener("DOMContentLoaded", async () => {
  const books = await loadBooksIntoLibrary();

  books.forEach((book) => {
    const shelf = document.getElementById("shelf");
    let bookEl = createBookUI(book);
    shelf.appendChild(bookEl);

    bookEl.addEventListener("click", selectBookFromLibrary);
  });
});
