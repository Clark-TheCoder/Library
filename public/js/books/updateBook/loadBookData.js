export async function getBookData(bookId) {
  try {
    const response = await fetch(`/books/book/${bookId}`, {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message, bookData: data.bookData };
    } else {
      window.location.href = "/error";
    }
  } catch (error) {
    window.location.href = "/error";
  }
}
