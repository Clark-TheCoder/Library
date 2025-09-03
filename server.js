import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "public")));

// Test route
app.get("/", (req, res) => res.send("Server running with MySQL!"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
