import { ReservationStatusRepository } from "../repositories/reservationstatus.repository.js";

export class ReservationStatusService {
    constructor() {
        this.reservationStatusRepository = new ReservationStatusRepository();
    }

    async getAllReservationStatus() {
        return this.reservationStatusRepository.findAll();
    }

    async getReservationStatusById(id) {
        const reservationStatus = this.reservationStatusRepository.findById(id);
        if (!reservationStatus) {
            throw new Error("ReservationStatus not found");
        }
        return reservationStatus;
    }

    async createReservationStatus(reservationStatus) {
        if (!reservationStatus) {
            throw new Error("ReservationStatus data is requiered");
        }
        if (!reservationStatus.name || reservationStatus.name.trim() === ""){
            throw new Error("ReservationStatus name is requiered");
        }
        return this.reservationStatusRepository.create(reservationStatus);
    }

    async updateReservationStatus(id, name){
        const reservationStatus = this.reservationStatusRepository.findById(id);
        if (!reservationStatus) {
            throw new Error("ReservationStatus not found");
        }
        if (!name){
            throw new Error("Name is requiered to update the Reservationstatus");
        }
        return this.reservationStatusRepository.update(id, name);
    }

    async deleteReservationStatus(id) {
        const reservationStatus = await this.reservationStatusRepository.findById(id);
        if (!reservationStatus) {
            throw new Error("ReservationStatus not found");
        }
        return this.reservationStatusRepository.delete(id);
    }
}