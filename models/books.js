import db from "./db.js";

export async function createBooksTable() {
  db.query(`CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    genre VARCHAR(100),
    rating INT,
    toughts TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`);
}

export async function createNewBook(bookInfo) {
  const sql =
    "INSERT INTO books (user_id, title, author, genre, rating, thoughts) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    bookInfo.userId,
    bookInfo.title,
    bookInfo.author,
    bookInfo.genre || null,
    bookInfo.rating || null,
    bookInfo.thoughts || null,
  ];
  try {
    const [row] = await db.execute(sql, values);
    return row;
  } catch (error) {
    return null;
  }
}

export async function getBooksByUserId(userId) {
  const sql =
    "SELECT id, title, author, genre, rating, thoughts FROM BOOKS WHERE user_id = ?";
  try {
    const [books] = await db.execute(sql, [userId]);
    return books;
  } catch (error) {
    return null;
  }
}

export async function deleteBookById(bookId, userId) {
  const sql = "DELETE FROM books WHERE id = ? AND user_id = ?";
  try {
    const [result] = await db.execute(sql, [bookId, userId]);
    return result.affectedRows > 0;
  } catch (error) {
    return null;
  }
}

export async function getBookById(bookId, userId) {
  const sql =
    "SELECT title, author, genre, rating, thoughts FROM books WHERE id = ? AND user_id = ?";
  try {
    const [result] = await db.execute(sql, [bookId, userId]);
    return result[0] || null;
  } catch (error) {
    return null;
  }
}
