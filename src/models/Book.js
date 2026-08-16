export class Book {
    constructor({ id, title, author, categoryId, saga, price, createdAt, updatedAt }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.categoryId = categoryId;
        this.saga = saga;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    update({ title, author, categoryId, saga, price }) {
        if (title !== undefined) {
            this.title = title;
        }
        if (author !== undefined) {
            this.author = author;
        }
        if (categoryId !== undefined) {
            this.categoryId = categoryId;
        }
        if (saga !== undefined) {
            this.saga = saga;
        }
        if (price !== undefined) {
            this.price = price;
        }
    }
}