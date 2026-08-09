import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Copy } from "../models/Copy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COPIES_FILE = path.join(__dirname, "../data/copies.json");

export class CopyRepository {
    async findAll() {
        const data = await fs.readFile(COPIES_FILE, "utf-8");
        const copies = JSON.parse(data);
        return copies.map(copy => new Copy(copy));
    }

    async findById(id) {
        const copies = await this.findAll();
        const copy = copies.find(copy => copy.id === id);
        return copy;
    }

    async create(copy) {
        const newCopy = new Copy(copy);
        const copies = await this.findAll();
        copies.unshift(newCopy);
        await fs.writeFile(
            COPIES_FILE,
            JSON.stringify(copies, null, 2)
        );
        return newCopy;
    }

    async getCopiesByBookId(bookId) {
        return this.findAll().filter(copy => copy.bookId === bookId);
    }

    async deleteCopy(id) {
        const copy = await this.findById(id);
        if (!copy) {
            throw new Error("Copy not found");
        }
        const copies = await this.findAll();
        const updatedCopies = copies.filter(c => c.id !== id);
        await fs.writeFile(COPIES_FILE, JSON.stringify(updatedCopies, null, 2));
        return updatedCopies;
    }

    async update(copy) {
        const copies = await this.findAll();
        const index = copies.findIndex(c => c.id === copy.id);
        if (index === -1) {
            throw new Error("Copy not found");
        }
        copies[index] = copy;
        await fs.writeFile(COPIES_FILE, JSON.stringify(copies, null, 2));
        return copy;
    }
}