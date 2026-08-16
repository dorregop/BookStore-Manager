import { CopyRepository } from "../repositories/copies.repository.js";
import { BookRepository } from "../repositories/books.repository.js";
import { CopyStateRepository } from "../repositories/copystate.repository.js";
export class CopiesService {
    constructor() {
        this.copyRepository = new CopyRepository();
        this.bookRepository = new BookRepository();
        this.copyStateRepository = new CopyStateRepository();
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
        return this.copyRepository.getCopiesByBookId(bookId);
    }

    async createCopy(bookId) {
        if (!bookId) {
            throw new Error("Book id is required");
        }
        const book = await this.bookRepository.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        const availableState = await this.copyStateRepository.findByName("Available");
        if (!availableState) {
            throw new Error("Available state not found");
        }
        const copy = {
            bookId: book.id,
            stateId: availableState.id
        };
        return this.copyRepository.create(copy);
    }

    async updateCopy(copy) {
        if (!copy) {
            throw new Error("Copy data is required");
        }
        const existingCopy = await this.copyRepository.findById(copy.id);
        if (!existingCopy) {
            throw new Error("Copy not found");
        }

        if (copy.bookId) {
            const book = await this.bookRepository.findById(copy.bookId);
            if (!book) {
                throw new Error("Book not found");
            }
        }

        if (copy.stateId) {
            const state = await this.copyStateRepository.findById(copy.stateId);
            if (!state) {
                throw new Error("Copy state not found");
            }
        }
        return this.copyRepository.update(copy);
    }

    async deleteCopy(id) {
        const copy = await this.copyRepository.findById(id);
        if (!copy) {
            throw new Error("Copy not found");
        }
        const availableState =
            await this.copyStateRepository.findByName("Available");
        if (!availableState) {
            throw new Error("Available state not found");
        }
        if (copy.stateId !== availableState.id) {
            throw new Error(
                "Cannot delete a copy that is not available"
            );
        }
        return this.copyRepository.deleteCopy(id);
    }
}