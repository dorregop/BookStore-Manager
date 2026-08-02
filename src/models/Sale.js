import { v4 as uuidv4 } from "uuid";
export class Sale {
    constructor({ customerId, items = [], saleDate = new Date(), id = uuidv4() }) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.saleDate = saleDate;
    }

    addItem(item) {
        if (!item.copyId || item.price === undefined) {
            return false;
        }
        this.items.push(item);
        return true;
    }

    getTotal() {
        let total = 0;
        this.items.forEach(item => {
            total += item.price;
        });
        return total;
    }
}