import { BookRepository } from "../repositories/books.repository.js";
import { CategoryRepository } from "../repositories/categories.repository.js";
export class BooksService {
    constructor() {
        this.bookRepository = new BookRepository();
        this.categoryRepository = new CategoryRepository();
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
        if (!book.title || book.title.trim() === "") {
            throw new Error("Book title is required");
        }
        if (!book.author || book.author.trim() === "") {
            throw new Error("Book author is required");
        }
        if (!book.categoryId) {
            throw new Error("Category is required");
        }
        if (book.price === undefined || book.price <= 0) {
            throw new Error("Book price must be greater than 0");
        }
        const category = await this.categoryRepository.findById(book.categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        return this.bookRepository.create(book);
    }

    async updateBook(id, datos) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error("Book not found");
        }
        if (!datos) {
            throw new Error("Data is required to update the book");
        }
        if (datos.title !== undefined && datos.title.trim() === "") {
            throw new Error("Book title cannot be empty");
        }
        if (datos.author !== undefined && datos.author.trim() === "") {
            throw new Error("Book author cannot be empty");
        }
        if (datos.price !== undefined && datos.price <= 0) {
            throw new Error("Book price must be greater than 0");
        }
        if (datos.categoryId !== undefined) {
            const category = await this.categoryRepository.findById(datos.categoryId);
            if (!category) {
                throw new Error("Category not found");
            }
        }
        return this.bookRepository.update(id, datos);
    }

    //pendiente por copias de los libros
    async deleteBook(id) {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new Error("Book not found");
        }
        await this.bookRepository.delete(id);
    }
}