import { CopyStateController } from "../controllers/copystate.controller.js";
import express from "express";

const router = express.Router();
const copyStateController = new CopyStateController();

// FindAll
router.get("/", copyStateController.getCopyStates);

// FindById
router.get("/:id", copyStateController.getCopyStateById)

// Create
router.post("/", copyStateController.createCopyState);

// Update
router.put("/:id", copyStateController.updateCopyState);

// Delete
router.delete("/:id", copyStateController.deleteCopyState);

export default router;