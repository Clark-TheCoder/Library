export function createBookUI(book) {
  const bookDiv = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("h3");
  const rating = document.createElement("h3");
  const thoughts = document.createElement("h3");

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  rating.textContent = `Rating: ${book.rating}`;
  thoughts.textContent = `Thoughts: ${book.thoughts}`;

  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(rating);
  bookDiv.appendChild(thoughts);

  return bookDiv;
}
