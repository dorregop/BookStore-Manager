export class Sale {
    constructor({ customerId, items = [], total = 0, saleDate = new Date(), id = crypto.randomUUID() }) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.total = total;
        this.saleDate = saleDate;
    }
}