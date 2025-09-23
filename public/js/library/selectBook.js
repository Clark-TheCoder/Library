import { deleteBook } from "../books/deleteBook/deleteBook.js";

// export async function selectBookFromLibrary(e) {
//   const bookDiv = e.currentTarget;
//   enlargeBook(bookDiv);
// }

export function enlargeBook(bookDiv) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Clone the book so the shelf version of the book stays in the shelf
  const bookClone = bookDiv.cloneNode(true);

  // Create open book div
  const openBook = document.createElement("div");
  const rightPage = document.createElement("div");
  const leftPage = document.createElement("div");
  openBook.classList.add("open_book");
  rightPage.classList.add("right_page");
  leftPage.classList.add("left_page");
  openBook.appendChild(leftPage);
  openBook.appendChild(rightPage);

  // Add containers
  const buttonContainer = document.createElement("div");
  const authorAndTitleConatiner = document.createElement("div");
  const ratingContainer = document.createElement("div");

  // Style containers
  buttonContainer.classList.add("button_continer");

  // Append containers to the pages of the book
  rightPage.appendChild(buttonContainer);

  const englargedTitle = document.createElement("h1");
  englargedTitle.textContent = bookDiv;
  leftPage.appendChild(englargedTitle);

  // Add elements

  // Attach buttons to buttonContainer
  const returnBtn = createReturnButton();
  buttonContainer.appendChild(returnBtn);
  const editBtn = createEditButton();
  buttonContainer.appendChild(editBtn);
  const deleteBtn = createDeleteButton();
  buttonContainer.appendChild(deleteBtn);
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

  overlay.appendChild(openBook);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove(); // remove overlay and book
    }
  });
}

function createReturnButton() {
  const returnBtn = document.createElement("button");
  returnBtn.textContent = "<";
  returnBtn.classList.add("return_btn");
  returnBtn.addEventListener("click", () => {
    overlay.remove();
  });
  return returnBtn;
}

function createEditButton() {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit_btn");
  editBtn.addEventListener("click", () => {
    window.location.href = `/books/updateBook/${bookDiv.dataset.bookId}`;
  });
  return editBtn;
}

function createDeleteButton() {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.style.color = "black";

  return deleteBtn;
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

// Create elements inside the div
// const titleAndAuthContainer = document.createElement("div");
// const ratingContainer = document.createElement("div");
// const title = document.createElement("h2");
// const author = document.createElement("h3");
// titleAndAuthContainer.appendChild(title);
// titleAndAuthContainer.appendChild(author);
// leftPage.appendChild(titleAndAuthContainer);
// leftPage.appendChild(ratingContainer);

//createBookButtons(bookClone);
