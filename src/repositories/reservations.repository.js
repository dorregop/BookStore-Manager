import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Reservation } from "../models/Reservation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESERVATIONS_FILE = path.join(__dirname, "../data/reservations.json");

export class ReservationRepository {
    async create(reservationData) {
        const newReservation = new Reservation(reservationData);
        const reservations = await this.findAll();
        reservations.unshift(newReservation);
        await fs.writeFile(
            RESERVATIONS_FILE,
            JSON.stringify(reservations, null, 2)
        );
        return newReservation;
    }

    async findAll() {
        const data = await fs.readFile(RESERVATIONS_FILE, "utf-8");
        const reservations = JSON.parse(data);
        return reservations.map(reservation => new Reservation(reservation));
    }

    async findById(id) {
        const reservations = await this.findAll();
        const reservation = reservations.find(r => r.id === id);
        return reservation;
    }

    async update(reservationData) {
        const reservations = await this.findAll();
        const index = reservations.findIndex(r => r.id === reservationData.id);
        if (index === -1) {
            throw new Error("Reservation not found");
        }
        reservations[index] = new Reservation({ ...reservations[index], ...reservationData });
        await fs.writeFile(
            RESERVATIONS_FILE,
            JSON.stringify(reservations, null, 2)
        );
        return reservations[index];
    }
}