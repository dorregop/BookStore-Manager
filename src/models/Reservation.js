import { RESERVATION_STATES } from "../config/index.js";
import { v4 as uuidv4 } from "uuid";
export class Reservation {
    constructor({ userId, copyId, reservationDate = new Date(), status = RESERVATION_STATES.ACTIVE, id = uuidv4() }) {
        this.id = id;
        this.userId = userId;
        this.copyId = copyId;
        this.reservationDate = reservationDate;
        this.status = status;
    }

    cancel() {
        if (this.status === RESERVATION_STATES.CANCELLED) {
            return false;
        }

        this.status = RESERVATION_STATES.CANCELLED;
        return true;
    }

    isActive() {
        return this.status === RESERVATION_STATES.ACTIVE;
    }

    isCancelled() {
        return this.status === RESERVATION_STATES.CANCELLED;
    }
}