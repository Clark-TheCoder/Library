export async function createBook(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const rating = document.getElementById("rating").value;
  const thoughts = document.getElementById("thoughts").value;

  const data = { title, author, genre, rating, thoughts };

  try {
    const response = await fetch("/books/createBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.message);
    } else {
      window.location.href = "/users/library";
    }
  } catch (error) {
    window.location.href = "/error";
  }
}
