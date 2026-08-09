import ReservationRepository from '../repositories/reservation.repository.js';
import CopyRepository from '../repositories/copy.repository.js';
import UserRepository from '../repositories/users.repository.js';
import { STATES } from '../config/index.js';
export class ReservationService {
    constructor() {
        this.reservationRepository = new ReservationRepository();
        this.copyRepository = new CopyRepository();
        this.userRepository = new UserRepository();
    }

    async createReservation(reservationData) {
        const user = await this.userRepository.findById(reservationData.userId);
        if (!user) {
            throw new Error("User not found");
        }
        const copy = await this.copyRepository.findById(reservationData.copyId);
        if (!copy) {
            throw new Error("Copy not found");
        }
        if (!copy.isAvailable()) {
            throw new Error("Copy unavailable and cannot be reserved");
        }
        
        copy.changeState(STATES.RESERVED);
        await this.copyRepository.update(copy);
        return this.reservationRepository.create(reservationData);
    }

    async getReservations(){
        return this.reservationRepository.findAll();
    }

    async getReservationById(id){
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) {
            throw new Error("Reservation not found");
        }
        return reservation;
    }

    async cancelReservation(id){
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) {
            throw new Error("Reservation not found");
        }
        const copy = await this.copyRepository.findById(reservation.copyId);
        if (!copy) {
            throw new Error("Copy not found");
        }
        if (!copy.isReserved()) {
            throw new Error("Copy is not reserved and cannot be cancelled");
        }
        reservation.cancel();
        copy.changeState(STATES.AVAILABLE);
        await this.copyRepository.update(copy);
        return this.reservationRepository.update(reservation);
    }
}