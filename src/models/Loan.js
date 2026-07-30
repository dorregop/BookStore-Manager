export class Loan {
    constructor({ userId, copyId, loanDate = new Date(), returnDate = null, id = crypto.randomUUID() }) {
        this.id = id;
        this.userId = userId;
        this.copyId = copyId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }

    returnCopy(){

    }
}