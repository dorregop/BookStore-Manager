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
        if (!id) {
            throw new Error("Copy id is required");
        }
        const copy = await this.copyRepository.findById(id);
        if (!copy) {
            throw new Error("Copy not found");
        }
        return copy;
    }

    async getCopiesByBookId(bookId) {
        if (!bookId) {
            throw new Error("Book id is required");
        }
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
        const availableState =
            await this.copyStateRepository.findByName("Available");
        if (!availableState) {
            throw new Error("Available state not found");
        }
        const copy = {
            bookId: book.id,
            stateId: availableState.id
        };
        return this.copyRepository.create(copy);
    }

    async updateCopy(copyData) {
        if (!copyData) {
            throw new Error("Copy data is required");
        }
        const copy = await this.copyRepository.findById(copyData.id);
        if (!copy) {
            throw new Error("Copy not found");
        }
        // Cambiar libro
        if (
            copyData.bookId !== undefined &&
            copyData.bookId !== copy.bookId
        ) {
            const book = await this.bookRepository.findById(copyData.bookId);
            if (!book) {
                throw new Error("Book not found");
            }
            copy.bookId = copyData.bookId;
        }
        // Cambiar estado
        if (
            copyData.stateId !== undefined &&
            copyData.stateId !== copy.stateId
        ) {
            const currentState =
                await this.copyStateRepository.findById(copy.stateId);
            const newState =
                await this.copyStateRepository.findById(copyData.stateId);
            if (!currentState) {
                throw new Error("Current copy state not found");
            }
            if (!newState) {
                throw new Error("New copy state not found");
            }
            const canChange = this.isValidStateTransition(
                currentState.name,
                newState.name
            );
            if (!canChange) {
                throw new Error(
                    `Cannot change copy state from ${currentState.name} to ${newState.name}`
                );
            }
            copy.stateId = newState.id;
        }
        return this.copyRepository.update(copy);
    }

    async deleteCopy(id) {
        if (!id) {
            throw new Error("Copy id is required");
        }
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
        return this.copyRepository.delete(id);
    }

    isValidStateTransition(currentState, newState) {
        const transitions = {
            Available: ["Reserved", "Loaned", "Sold"],
            Reserved: ["Available", "Sold"],
            Loaned: ["Available"],
            Sold: []
        };
        return transitions[currentState]?.includes(newState) ?? false;
    }
}