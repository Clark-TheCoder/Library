export async function selectBookFromLibrary(e) {
  const bookDiv = e.currentTarget; // the div with .book class
  const bookId = bookDiv.dataset.bookId;
  console.log(bookId);
}
