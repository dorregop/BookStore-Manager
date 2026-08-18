import { ReservationStatusService } from "../services/reservationstatus.service.js";

export class ReservationStatusController{
    constructor(){
        this.reservationStatusService = new ReservationStatusService();

        this.getAllReservationStatus = this.getAllReservationStatus.bind(this);
        this.getReservationStatusById = this.getReservationStatusById.bind(this);
        this.createReservationStatus = this.createReservationStatus.bind(this);
        this.updateReservationStatus = this.updateReservationStatus.bind(this);
        this.deleteReservationStatus = this.deleteReservationStatus.bind(this);
    }

    async getAllReservationStatus(req, res) {
        const reservationStatus = await this.reservationStatusService.getAllReservationStatus();
        res.status(200).json(reservationStatus);
    }

    async getReservationStatusById(req, res) {
        const reservationStatus = await this.reservationStatus.getReservationStatusById(req.params.id);
        res.status(200).json(reservationStatus);
    }

    async createReservationStatus(req, res) {
        const reservationStatus = await this.reservationStatus.createReservationStatus(req.body.name);
        res.status(201).json(reservationStatus);
    }

    async updateReservationStatus(req, res) {
        const reservationStatus = await this.reservationStatus.updateReservationStatus(req.params.id, req.body.name);
        res.status(200).json(reservationStatus);
    }

    async deleteReservationStatus(req, res) {
        const reservationStatus = await this.reservationStatus.deleteReservationStatus(req.params.id);
        res.status(200).json(reservationStatus);
    }
}