import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import {
  createNewBook,
  getBooksByUserId,
  deleteBookById,
  getBookById,
  updateBookById,
} from "../../models/books.js";

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

export async function getBooks(req, res) {
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

  try {
    const books = await getBooksByUserId(userId);

    if (!books) {
      return res.status(404).json({ message: "No books found" });
    }

    res.json({ books });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteBook(req, res) {
  const { id } = req.params;
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

  try {
    const result = await deleteBookById(id, userId);
    if (result) {
      return res.status(200).json({ message: "Book deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "Book not found or not authorized." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getBook(req, res) {
  const { id } = req.params;

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

  try {
    const bookData = await getBookById(id, userId);
    return res.status(200).json({ success: true, bookData });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateBook(req, res) {
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
  const bookId = req.params.id;
  const formData = req.body;

  try {
    const result = await updateBookById(bookId, formData, userId);
    if (!result) {
      return res.status(404).json({ message: "Book not found or not updated" });
    }
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
