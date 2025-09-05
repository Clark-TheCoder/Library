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
