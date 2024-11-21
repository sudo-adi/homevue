import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUsers); // Get all users
router.get("/:id", authMiddleware, getUserById); // Get user by ID
router.post("/", authMiddleware, createUser); // Create a new user
router.put("/:id", authMiddleware, updateUser); // Update a user by ID
router.delete("/:id", authMiddleware, deleteUser); // Delete a user by ID

export default router;
