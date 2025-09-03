import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createUserTable } from "./models/users.js";
import { createBooksTable } from "./models/books.js";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Create tables
await createUserTable();
await createBooksTable();

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "public")));

// Use JSON
app.use(express.json());

// Set up EJS
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Test route
app.get("/", (req, res) => res.send("Server running with MySQL!"));

// Auth routes
app.use("/auth", authRoutes);
// Book routes
app.use("/books", bookRoutes);
// User routes
app.use("/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
