export async function selectBookFromLibrary(e) {
  const bookDiv = e.currentTarget; // the div with .book class
  const bookId = bookDiv.dataset.bookId;

  enlargeBook(bookDiv);
}

function enlargeBook(bookDiv) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Clone the book so the shelf copy stays put
  const bookClone = bookDiv.cloneNode(true);
  bookClone.classList.add("enlarge_book");
  overlay.appendChild(bookClone);

  // Remove overlay and large book when clicking the overlay again
  overlay.addEventListener("click", () => {
    overlay.remove();
  });
}
