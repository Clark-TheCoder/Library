export async function getBookData(bookId) {
  try {
    const response = await fetch(`/books/book/${bookId}`, {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();
    if (response.ok) {
      console.log(data);
      return { success: true, message: data.message, bookData: data.bookData };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.log(error);
  }
  console.log("hi");
}
