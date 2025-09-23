export async function loadBooksIntoLibrary() {
  try {
    let response = await fetch("/books/getBooks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    let result = await response.json();
    if (!response.ok) {
      return false;
    } else {
      return result.books;
    }
  } catch (error) {
    return false;
  }
}
