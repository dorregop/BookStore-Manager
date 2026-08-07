import CopyRepository from "../repositories/copies.repository.js";
import BookRepository from "../repositories/books.repository.js";
export class CopiesService {
    constructor() {
        this.copyRepository = new CopyRepository();
        this.bookRepository = new BookRepository();
    }

    async createCopy(copyData) {
        const book = await this.bookRepository.findById(copyData.bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return await this.copyRepository.create(copyData);
    }

    async getCopies() {
        return this.copyRepository.findAll();
    }

    async getCopyById(id) {
        const copy = await this.copyRepository.findById(id);
        if (!copy) {
            throw new Error("Copy not found");
        }
        return copy;
    }

    async getCopiesByBookId(bookId) {
        const book = await this.bookRepository.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return await this.copyRepository.getCopiesByBookId(bookId);
    }

    async deleteCopy(id) {
        const copy = await this.copyRepository.findById(id);
        if (!copy) {
            throw new Error("Copy not found");
        }
        if (!copy.isAvailable()) {
            throw new Error("Cannot delete a copy that is not available");
        }
        return await this.copyRepository.deleteCopy(id);
    }
}