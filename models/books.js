import db from "./db.js";

export async function createBooksTable() {
  db.query(`CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    genre VARCHAR(100),
    rating INT,
    summary TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`);
}
