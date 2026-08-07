import { BookRepository } from "../repositories/books.repository.js";
export class BooksService {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    async getBooks() {
        return this.bookRepository.findAll();
    }

    async getBookById(id) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }

    async createBook(book) {
        if (!book) {
            throw new Error("Book data is required");
        }
        const newBook = await this.bookRepository.create(book);
        return newBook;
    }

    //pendiente por copias de los libros
    async deleteBook(id) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error("Book not found");
        }
        await this.bookRepository.delete(id);
    }

    async updateBook(id, datos) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error("Book not found");
        }
        if (!datos) {
            throw new Error("Data is required to update the book");
        }
        return this.bookRepository.update(id, datos);
    }
}