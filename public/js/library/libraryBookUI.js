export function createBookUI(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.bookId = book.id;

  // Title and Author
  const titleAndAuthContainer = document.createElement("div");
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
    "#6E72FF",
    "#B7BA6A",
    "#E05D4F",
    "#F8BDFF",
    "#8BAFF7",
    "#CFA1FF",
  ];
  let randomColour = colours[Math.floor(Math.random() * colours.length)];
  bookDiv.style.backgroundColor = randomColour;

  return bookDiv;
}
