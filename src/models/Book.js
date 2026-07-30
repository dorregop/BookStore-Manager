
export class Books {

    constructor({ title, author, category, saga, price, id = crypto.randomUUID() }) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.saga = saga;
        this.isbn = isbn;
        this.price = price;
        this.description = description
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
            this.saga = saga;
        if (isbn) {
            this.isbn = isbn;
        }
        if (price){
            this.price = price;
        }
        if (description) {
            this.description = description
        }
    }
}