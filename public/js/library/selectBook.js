import { deleteBook } from "../books/deleteBook/deleteBook.js";

export async function selectBookFromLibrary(e) {
  const bookDiv = e.currentTarget;
  enlargeBook(bookDiv);
}

function enlargeBook(bookDiv) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Clone the book so the shelf version of the book stays in the shelf
  const bookClone = bookDiv.cloneNode(true);
  bookClone.classList.add("enlarge_book");

  // Add buttons only if they don’t already exist
  // Return Button
  if (!bookClone.querySelector(".return_btn")) {
    const returnBtn = document.createElement("button");
    returnBtn.textContent = "<";
    returnBtn.classList.add("return_btn");
    bookClone.appendChild(returnBtn);

    returnBtn.addEventListener("click", () => {
      overlay.remove();
    });
  }

  // Edit Button
  if (!bookClone.querySelector(".edit_btn")) {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit_btn");
    editBtn.addEventListener("click", () => {
      window.location.href = `/books/updateBook/${bookDiv.dataset.bookId}`;
    });
    bookClone.appendChild(editBtn);
  }

  // Delete Button
  if (!bookClone.querySelector(".delete_btn")) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete_btn");
    bookClone.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      // Create confirm deletion
      if (!bookClone.querySelector(".del_popup")) {
        const popup = deleteBookPopup();
        bookClone.appendChild(popup);

        const confirmBtn = popup.querySelector(".confirm_button");
        confirmBtn.addEventListener("click", async () => {
          let deletedBook = await deleteBook(bookDiv.dataset.bookId);
          if (deletedBook.success === true) {
            // Remove the book from the shelf
            bookDiv.remove();

            // Close the overlay
            overlay.remove();
          } else {
            alert(deletedBook.message || "Error deleting book");
          }
          overlay.remove();
        });
      }
    });
  }

  overlay.appendChild(bookClone);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

export function deleteBookPopup() {
  // Create elements for popup
  const popup = document.createElement("div");
  popup.classList.add("del_popup");
  const text = document.createElement("h3");
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel_button");
  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirm_button");

  // Add text
  text.textContent =
    "Are you sure you would like to delete this book from you library?";
  cancelBtn.textContent = "Cancel";
  confirmBtn.textContent = "Delete Book";

  // Add eventlisteners to buttons
  cancelBtn.addEventListener("click", () => {
    popup.remove();
  });

  // Append elements
  popup.appendChild(text);
  popup.appendChild(cancelBtn);
  popup.appendChild(confirmBtn);
  popup.style.zIndex = "1000";
  return popup;
}
