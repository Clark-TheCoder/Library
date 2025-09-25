import { getQuote } from "./api/getQuote.js";

document.addEventListener("DOMContentLoaded", async () => {
  const quote = document.getElementById("quote");
  const quotedBy = document.getElementById("quotedBy");
  let { text, author } = await getQuote();
  quote.innerHTML = text;
  quotedBy.innerHTML = author;
});
