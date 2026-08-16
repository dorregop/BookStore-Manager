import { CopiesController } from "../controllers/copies.controller.js";
import express from "express";

const router = express.Router();
const copiesController = new CopiesController();

// FindAll
router.get("/", copiesController.getCopies);

// FindCopiesByBook
router.get("/book/:bookId", copiesController.getCopiesByBookId);

// FindById
router.get("/:id", copiesController.getCopyById);

// Create
router.post("/", copiesController.createCopy);

// Update
router.put("/:id", copiesController.updateCopy);

// Delete
router.delete("/:id", copiesController.deleteCopy);

export default router;