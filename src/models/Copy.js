export class Copy {
    constructor({ bookId, stateId, createdAt = new Date(), id}) {
        this.id = id;
        this.bookId = bookId;
        this.stateId = stateId;
        this.createdAt = createdAt;
    }

    changeState(stateId) {
        this.stateId = stateId;
    }
}