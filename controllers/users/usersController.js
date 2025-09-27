import {
  getUserByEmail,
  getUserByUsername,
  updateUserById,
} from "../../models/usersModel.js";

import bcrypt from "bcrypt";

export async function updateUser(req, res) {
  const userId = req.user.id;
  const { username, email, newPassword, confirmPassword } = req.body;

  let changedFields = {};
  if (username) changedFields.username = username;
  if (email) changedFields.email = email;

  if (username) {
    try {
      const existingUsername = await getUserByUsername(username);
      if (existingUsername) {
        return res.status(409).json({ message: "Username already taken" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Cannot update at this time" });
    }
  }

  if (email) {
    try {
      const existingEmail = await getUserByEmail(email);
      if (existingEmail) {
        return res.status(409).json({ message: "Email already taken" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Cannot update at this time" });
    }
  }

  if (newPassword) {
    if (!confirmPassword || newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    changedFields.password = hashedPassword;
  }

  try {
    const updatedUser = await updateUserById(userId, changedFields);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or not updated" });
    } else {
      return res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Cannot update at this time" });
  }
}
