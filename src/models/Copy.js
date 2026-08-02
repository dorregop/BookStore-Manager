import { STATES } from "../config/index.js";
import { v4 as uuidv4 } from "uuid";
export class Copy {

    constructor({ bookId, state, createdAt = new Date(), id = uuidv4() }) {
        this.id = id;
        this.bookId = bookId;
        this.state = STATES.AVAILABLE;
        this.createdAt = createdAt;
    }

    changeState(newState) {
        if (newState === this.state) {
            return false;
        }

        switch (this.state) {
            case STATES.AVAILABLE:
                if (newState === STATES.RESERVED || newState === STATES.LOANED || newState === STATES.SOLD) {
                    this.state = newState;
                    return true;
                }
                break;
            case STATES.RESERVED:
                if (newState === STATES.AVAILABLE || newState === STATES.SOLD) {
                    this.state = newState;
                    return true;
                }
                break;
            case STATES.LOANED:
                if (newState === STATES.AVAILABLE) {
                    this.state = newState;
                    return true;
                }
                break;
        }
        return false;
    }

    isAvailable() {
        return this.state === STATES.AVAILABLE;
    }

    isReserved() {
        return this.state === STATES.RESERVED;
    }

    isLoaned() {
        return this.state === STATES.LOANED;
    }

    isSold() {
        return this.state === STATES.SOLD;
    }
}