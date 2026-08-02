import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Book } from "../models/Book.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_FILE = path.join(__dirname, "../data/books.json");

export class BooksRepository {
    async findAll() {
        const data = await fs.readFile(BOOKS_FILE, "utf-8");
        const books = JSON.parse(data);
        return books.map(book => new Book(book));
    }

    async findById(id){
        const books = await this.findAll();
        const book = books.find(book => book.id === id);
        return book;
    }

    createBook(book){
        const newBook = new Book(book);
        return this.findAll().then(books => {
            books.unshift(newBook);
            return fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2)).then(() => newBook);
        });
    }

    updateBook(id, data){
        return this.findAll().then(books => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                throw new Error("Book not found");
            }
            books[bookIndex].update(data);
            return fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2)).then(() => books[bookIndex]);
        });
    }

    deleteBook(id){
        return this.findAll().then(books => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                throw new Error("Book not found");
            }
            books.splice(bookIndex, 1);
            return fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
        });
    }
}