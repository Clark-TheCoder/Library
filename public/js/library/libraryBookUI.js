import { deleteBook } from "../books/deleteBook/deleteBook.js";

export function createBookUI(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.bookId = book.id;

  // Title and Author
  const titleAndAuthContainer = document.createElement("div");
  titleAndAuthContainer.classList.add("title_and_auth");
  const title = document.createElement("h2");
  const author = document.createElement("h3");

  title.textContent = `${book.title}`;
  author.textContent = `By: ${book.author}`;

  // Control the font based on the size of the text of the title's length
  if (title.textContent.length > 30) {
    title.style.fontSize = "1.2rem";
  }
  if (title.textContent.length > 50) {
    title.style.fontSize = "0.90rem";
  }

  titleAndAuthContainer.appendChild(title);
  titleAndAuthContainer.appendChild(author);

  // Add stars according to rating
  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars_container");

  const ratingValue = Number(book.rating);
  if (!isNaN(ratingValue)) {
    for (let i = 0; i < ratingValue; i++) {
      const starImg = document.createElement("img");
      starImg.src = "/media/library/star.png";
      starImg.alt = "star";
      starsContainer.appendChild(starImg);
    }
  }

  // Thoughts are hidden by default
  const thoughts = document.createElement("h3");
  thoughts.textContent = `Thoughts: ${book.thoughts}`;
  thoughts.classList.add("hidden");

  // Build the book div
  bookDiv.appendChild(titleAndAuthContainer);
  bookDiv.appendChild(starsContainer);
  bookDiv.appendChild(thoughts);

  // Colour the book
  let colours = [
    "#6e72ff",
    "#f8bdff",
    "#cfa1ff",
    "#ffe6fa",
    "#d9f8d6",
    "#70c9da",
    "#c06eff",
    "#8baff7",
  ];
  let randomColour = colours[Math.floor(Math.random() * colours.length)];
  bookDiv.style.backgroundColor = randomColour;

  bookDiv.addEventListener("click", () => {
    enlargeBook(book);
  });

  return bookDiv;
}

export function enlargeBook(book) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Create open book element
  const openBook = document.createElement("div");
  const rightPage = document.createElement("div");
  const leftPage = document.createElement("div");
  openBook.classList.add("open_book");
  rightPage.classList.add("right_page");
  leftPage.classList.add("left_page");
  openBook.appendChild(leftPage);
  openBook.appendChild(rightPage);

  // Create left page content
  const title = document.createElement("h2");
  const author = document.createElement("h3");
  const starsContainer = document.createElement("div");

  // Add styling to left page elements
  title.classList.add("enlarged_title");
  author.classList.add("enlarged_author");

  // Add text content to left page elements
  title.innerText = book.title;
  author.innerText = book.author;

  // Add graphics content to left page elements
  starsContainer.classList.add("stars_container");
  const ratingValue = Number(book.rating);
  if (!isNaN(ratingValue)) {
    for (let i = 0; i < ratingValue; i++) {
      const starImg = document.createElement("img");
      starImg.src = "/media/library/star.png";
      starImg.alt = "star";
      starsContainer.appendChild(starImg);
    }
  }

  // Append elements to left page
  leftPage.appendChild(title);
  leftPage.appendChild(author);
  leftPage.appendChild(starsContainer);

  // Create right page content
  const thoughts = document.createElement("p");
  const buttonsContainer = document.createElement("div");

  // Add text content to right page elements
  thoughts.innerHTML = `<strong>Your thoughts:</strong> ${book.thoughts}`;
  thoughts.classList.add("thoughts");

  // Add buttons to the button container
  const returnBtn = createReturnButton();
  buttonsContainer.appendChild(returnBtn);
  const editBtn = createEditButton(book);
  buttonsContainer.appendChild(editBtn);
  const deleteBtn = createDeleteButton();
  buttonsContainer.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    // Create confirm deletion
    const popup = deleteBookPopup(book);
    popup.classList.add("popup");
    document.body.appendChild(popup);
  });

  // Append element to the right page
  rightPage.appendChild(thoughts);
  rightPage.appendChild(buttonsContainer);

  // Remove overlay
  overlay.appendChild(openBook);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove(); // remove overlay and book
    }
  });
}

function createReturnButton() {
  const returnBtn = document.createElement("button");
  returnBtn.textContent = "Back";
  returnBtn.classList.add("return_btn");
  returnBtn.addEventListener("click", () => {
    const overlay = document.querySelector(".overlay");
    overlay.remove();
  });
  return returnBtn;
}

function createEditButton(book) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit_btn");
  editBtn.addEventListener("click", () => {
    window.location.href = `/books/updateBook/${book.id}`;
  });
  return editBtn;
}

function createDeleteButton() {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  return deleteBtn;
}

export function deleteBookPopup(book) {
  // Create elements for popup
  const popup = document.createElement("div");
  popup.classList.add("del_popup");
  const text = document.createElement("h3");
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel_button");
  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirm_button");

  // Create overlay
  const popupOverlay = document.createElement("div");
  popupOverlay.classList.add("popup_overlay");
  document.body.appendChild(popupOverlay);

  // Add text
  text.textContent =
    "Are you sure you would like to delete this book from you library?";
  cancelBtn.textContent = "Cancel";
  confirmBtn.textContent = "Delete Book";

  // Add eventlisteners to buttons
  cancelBtn.addEventListener("click", () => {
    popup.remove();
    popupOverlay.remove();
  });

  confirmBtn.addEventListener("click", async () => {
    let deletedBook = await deleteBook(book.id);
    if (deletedBook) {
      location.reload();
    } else if (!deletedBook) {
      window.location.href = "/error";
    }
  });

  // Append elements
  popup.appendChild(text);
  popup.appendChild(cancelBtn);
  popup.appendChild(confirmBtn);
  popup.style.zIndex = "1000";

  return popup;
}
