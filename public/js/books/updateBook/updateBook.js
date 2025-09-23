export async function updateBook(bookId, formData) {
  try {
    const response = await fetch(`/updateBook/${bookId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.log(error);
  }
}
