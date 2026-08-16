import { UserController } from "../controllers/users.controller.js";
import express from "express";

const router = express.Router();
const userController = new UserController();

// FindAll
router.get("/", userController.getUsers);

// FindById
router.get("/:id", userController.getUserById)

// Create
router.post("/", userController.createUser);

// Update
router.put("/:id", userController.updateUser);

// Delete
router.delete("/:id", userController.deleteUser);

export default router;