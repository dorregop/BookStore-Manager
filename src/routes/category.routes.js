import { CategoryController } from "../controllers/category.controller.js";
import express from "express";

const router = express.Router();
const categoryController = new CategoryController();

// find all categories
router.get("/", categoryController.getCategories);

// find categories by id
router.get("/:id", categoryController.getCategoryById)

// create category
router.post("/", categoryController.createCategory);

// update category
router.put("/:id", categoryController.updateCategory);

// delete category
router.delete("/:id", categoryController.deleteCategory);

export default router;

