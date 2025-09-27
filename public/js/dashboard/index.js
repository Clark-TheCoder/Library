import { getBestSellers } from "./api/getBestSellers.js";
import { getQuote } from "./api/getQuote.js";

document.addEventListener("DOMContentLoaded", async () => {
  const quote = document.getElementById("quote");
  const quotedBy = document.getElementById("quotedBy");
  let { text, author } = await getQuote();
  quote.innerHTML = text;
  quotedBy.innerHTML = author;

  const data = await getBestSellers();
  console.log(data);
  createBooks(data);
});

function createBooks(booksArray) {
  const bestSellersContainer = document.getElementById(
    "best_sellers_container"
  );
  booksArray.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book_div");

    const img = document.createElement("img");
    img.src = book.book_image;
    const bookTextDiv = document.createElement("div");
    bookTextDiv.classList.add("book_text");
    const title = document.createElement("h5");
    title.innerHTML = book.title;
    const author = document.createElement("h6");
    author.innerHTML = book.author;
    const rank = document.createElement("h4");
    rank.innerHTML = book.rank;
    bookTextDiv.appendChild(title);
    bookTextDiv.appendChild(author);
    bookTextDiv.appendChild(rank);

    bookDiv.appendChild(img);
    bookDiv.appendChild(bookTextDiv);

    bestSellersContainer.appendChild(bookDiv);
  });
}
