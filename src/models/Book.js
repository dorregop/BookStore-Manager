import { v4 as uuidv4 } from "uuid";
export class Book {
    constructor({ title, author, category, saga, price, id = uuidv4() }) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.saga = saga;
        this.price = price;
        this.id = id;
    }

    update({ title, author, category, saga, price }) {
        if (title) {
            this.title = title;
        }
        if (author) {
            this.author = author;
        }
        if (category) {
            this.category = category;
        }
        if (saga !== undefined) {
            this.saga = saga;
        }
        if (price !== undefined && price > 0) {
            this.price = price;
        }
    }
}