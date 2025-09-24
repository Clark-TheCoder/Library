export async function updateBook(bookId) {
  const formData = {
    title: title.value,
    author: author.value,
    genre: genre.value || "",
    rating: rating.value || "",
    thoughts: thoughts.value || "",
  };

  if (!formData.title) {
    return false;
  }
  if (!formData.author) {
    return false;
  }

  try {
    const response = await fetch(`/books/updateBook/${bookId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      window.location.href = "/error";
    } else {
      return true;
    }
  } catch (error) {
    window.location.href = "/error";
  }
}
