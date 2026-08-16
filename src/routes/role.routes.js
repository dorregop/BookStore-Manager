import { RoleController } from "../controllers/role.controller.js";
import express from "express";

const router = express.Router();
const roleController = new RoleController();

// FindAll
router.get("/", roleController.getRoles);

// FindById
router.get("/:id", roleController.getRoleById)

// Create
router.post("/", roleController.createRole);

// Update
router.put("/:id", roleController.updateRole);

// Delete
router.delete("/:id", roleController.deleteRole);

export default router;