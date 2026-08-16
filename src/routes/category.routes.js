import { CategoryController } from "../controllers/category.controller.js";
import express from "express";

const router = express.Router();
const categoryController = new CategoryController();

// Find All
router.get("/", categoryController.getCategories);

// FindById
router.get("/:id", categoryController.getCategoryById)

// Create
router.post("/", categoryController.createCategory);

// Update
router.put("/:id", categoryController.updateCategory);

// Delete
router.delete("/:id", categoryController.deleteCategory);

export default router;

