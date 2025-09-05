import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { createNewBook } from "../../models/books.js";

export async function addBook(req, res) {
  // Get userID
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({
      message: "Not authenticated. Please log back in and try again.",
    });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token. Please log back in and try again." });
  }

  const userId = decodedToken.id;

  // Ensure required fields are present
  if (!req.body.title || !req.body.author) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }

  const bookData = {
    userId,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre || null,
    rating: req.body.rating || null,
    thoughts: req.body.thoughts || "",
  };

  try {
    const result = await createNewBook(bookData);
    if (result) {
      return res.status(201).json({ message: "Entry saved to your library" });
    } else {
      return res
        .status(400)
        .json({ message: "Could not save your entry at this time" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
