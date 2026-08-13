import { RoleController } from "../controllers/role.controller.js";
import express from "express";

const router = express.Router();
const roleController = new RoleController();

// find all categories
router.get("/", roleController.getRoles);

// find categories by id
router.get("/id/:id", roleController.getRoleById)

// create category
router.post("/", roleController.createRole);

// update category
router.put("/:id", roleController.updateRole);

// delete category
router.delete("/:id", roleController.deleteRole);

export default router;

