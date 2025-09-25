import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createUserTable } from "./models/usersModel.js";
import { createBooksTable } from "./models/books.js";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import { getQuote } from "./controllers/api/apiController.js";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

// Create tables
await createUserTable();
await createBooksTable();

// Use JSON
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "public")));

// Set up EJS
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Home
app.get("/", (req, res) => res.render("landingPage"));

// Auth routes
app.use("/auth", authRoutes);
// Book routes
app.use("/books", bookRoutes);
// User routes
app.use("/users", userRoutes);
// Error page
app.get("/error", (req, res) => res.render("404"));

// Quote API
app.get("/getQuote", getQuote);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
