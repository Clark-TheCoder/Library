import { createNewBook } from "../../models/books.js";

export async function addBook(req, res) {
  if (!req.body.title || !req.body.author) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }

  const bookData = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre || null,
    rating: req.body.rating || null,
    thoughts: req.body.thoughts || "",
  };

  try {
    const result = await createNewBook(bookData);
    if (result) {
      return res.status(400).json({ message: "Entry saved to your library" });
    } else {
      return res
        .status(400)
        .json({ message: "Could not save your entry at this time" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
