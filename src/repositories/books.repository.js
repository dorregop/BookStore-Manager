import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Book } from "../models/Book.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_FILE = path.join(__dirname, "../data/books.json");

export class BookRepository {
    async findAll() {
        const data = await fs.readFile(BOOKS_FILE, "utf-8");
        const books = JSON.parse(data);
        return books.map(book => new Book(book));
    }

    async findById(id) {
        const books = await this.findAll();
        const book = books.find(book => book.id === id);
        return book;
    }

    async create(book) {
        const newBook = new Book(book);
        const books = await this.findAll();
        books.unshift(newBook);
        await fs.writeFile(
            BOOKS_FILE,
            JSON.stringify(books, null, 2)
        );
        return newBook;
    }

    async update(id, data) {
        const books = await this.findAll();
        const book = books.find(book => book.id === id);
        if (!book) {
            throw new Error("Book not found");
        }
        book.update(data);
        await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
        return book;
    }

    async delete(id) {
        const books = await this.findAll();
        const book = books.find(book => book.id === id);
        if (!book) {
            throw new Error("Book not found");
        }
        books.splice(books.indexOf(book), 1);
        await fs.writeFile(
            BOOKS_FILE,
            JSON.stringify(books, null, 2)
        );
        return books;
    }
}