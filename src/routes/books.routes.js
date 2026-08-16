import { BookController } from "../controllers/books.controller.js";
import express from "express";

const router = express.Router();
const bookController = new BookController();

// findAll
router.get("/", bookController.getBooks);

// FindById
router.get("/:id", bookController.getBookById)

// Create
router.post("/", bookController.createBook);

// Update
router.put("/:id", bookController.updateBook);

// Dlete
router.delete("/:id", bookController.deleteBook);

export default router;