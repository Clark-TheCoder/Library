export async function deleteBook(bookId) {
  try {
    const response = await fetch(`/books/deleteBook/${bookId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Delete failed:", data.message);
      false;
    }
    console.log("Delete success:", data.message);
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Network error:", error);
    return false;
  }
}
