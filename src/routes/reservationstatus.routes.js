import { ReservationStatusController } from "../controllers/reservationstatus.controller.js"
import express from "express";

const router = express.Router();
const reservationStatusController = new ReservationStatusController();

// findAll
router.get("/", reservationStatusController.getAllReservationStatus);

// FindById
router.get("/:id", reservationStatusController.getReservationStatusById);

// Create
router.post("/", reservationStatusController.createReservationStatus);

// Update
router.put("/:id", reservationStatusController.updateReservationStatus);

// Dlete
router.delete("/:id", reservationStatusController.deleteReservationStatus);

export default router;