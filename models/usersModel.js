import db from "./db.js";
import bcrypt from "bcrypt";

export async function createUserTable() {
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  console.log("Users table created");
}

export async function getUserByUsername(username) {
  const sql = "SELECT id, username, email FROM users WHERE username = ?";
  const [rows] = await db.execute(sql, [username]);
  return rows[0];
}

export async function getUserByEmail(email) {
  const sql = "SELECT id, username, email FROM users WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
}

export async function createUser(username, email, hashedPassword) {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const [row] = await db.execute(sql, [username, email, hashedPassword]);
  return row;
}

export async function authenticateUser(username, password) {
  const sql = "SELECT * FROM users WHERE username = ?";
  const [row] = await db.execute(sql, [username]);
  const user = row[0];

  if (!user) return false;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return false;

  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  return userWithoutPassword;
}
