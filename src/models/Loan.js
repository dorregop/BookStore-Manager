export class Loan {
    constructor({ userId, copyId, loanDate = new Date(), returnDate = null, id }) {
        this.id = id;
        this.userId = userId;
        this.copyId = copyId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }

    returnCopy() {
        if (this.returnDate !== null) {
            return false;
        }
        this.returnDate = new Date();
        return true;
    }

    isActive() {
        return this.returnDate === null;
    }

    isReturned() {
        return this.returnDate !== null;
    }
}