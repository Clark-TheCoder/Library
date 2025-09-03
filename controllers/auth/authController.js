import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserByUsername,
  getUserByEmail,
  createUser,
} from "../../models/users.js";

export async function signupUser(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  // Check to ensure password and confirmed password are the same
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check email and username first avoid duplicates
    if (await getUserByUsername(username)) {
      return res.status(400).json({ message: "Username already taken" });
    }
    if (await getUserByEmail(email)) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in db
    const user = await createUser(username, email, hashedPassword);

    if (user) {
      // Create JWT and set cookie
      const token = jwt.sign({ id: user.insertId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "Strict",
      });

      return res.status(201).json({ message: "User created" });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
