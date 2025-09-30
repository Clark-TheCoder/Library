export function displayQuote(text, author) {
  const quote = document.getElementById("quote");
  const quotedBy = document.getElementById("quotedBy");
  quote.innerHTML = text;
  quotedBy.innerHTML = author;
}
