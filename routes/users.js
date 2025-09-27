import express from "express";
import { updateUser } from "../controllers/users/usersController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/add", (req, res) => {
  res.send("User library");
});

router.get("/library", (req, res) => {
  res.render("library");
});

router.get("/updateUser", (req, res) => {
  res.render("updateUser");
});

router.patch("/updateUser", authenticateUser, updateUser);

export default router;
