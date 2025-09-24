import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserByUsername,
  getUserByEmail,
  createUser,
  authenticateUser,
} from "../../models/usersModel.js";

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
    return res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Ensure all fields are filled out" });
  }

  try {
    const user = await authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "User logged in" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export function logoutUser(req, res) {
  try {
    // Clear the auth_token cookie
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: false, // set true if using HTTPS
    });

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateUser(req, res) {}
