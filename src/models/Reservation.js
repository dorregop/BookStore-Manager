export class Reservation {
    constructor({ userId, copyId, reservationDate = new Date(), id = crypto.randomUUID() }) {
        this.id = id;
        this.userId = userId;
        this.copyId = copyId;
        this.reservationDate = reservationDate;
    }

    cancel(){

    }
}