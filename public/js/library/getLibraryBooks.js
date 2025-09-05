export async function loadBooksIntoLibrary() {
  try {
    let response = await fetch("/books/getBooks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    let result = await response.json();
    if (!response.ok) {
      console.log("no");
      console.log(result.message);
    } else {
      console.log("ok");
      console.log(result.books);
    }
  } catch (error) {
    console.log(error);
  }
}
