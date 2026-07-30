import { STATES, ROLES, HTTP_CODES } from "../config/index.js";
export class copy {

    constructor({ idBook, state, createdAt = new Date(), id = crypto.randomUUID() }) {
        this.id = id;
        this.bookId = bookId;
        this.state = state;
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

    isAvailable(){

    }

    isReserved(){

    }

    isLoaned(){

    }

    isSold(){

    }
}

