import { CopyStateRepository } from "../repositories/copystate.repository.js";

export class CopyStateService {
    constructor() {
        this.copyStateRepository = new CopyStateRepository();
    }

    async getCopyStates() {
        return this.copyStateRepository.findAll();
    }

    async getCopyStatesById(id) {
        if (!id) {
            throw new Error("Copy State id is required")
        }
        const copyState = this.copyStateRepository.findById(id);
        if (!copyState) {
            throw new Error("Copy State not found");
        }
        return copyState;
    }

    async createCopyState(name) {
        if (!name || name.trim() === "") {
            throw new Error("Copy State name is required");
        }
        return this.copyStateRepository.create(name.trim());
    }

    async updateCopyState(id, name) {
        if (!id) {
            throw new Error("Copy State id is required");
        }
        if (!name || name.trim() === "") {
            throw new Error("Copy State name is required");
        }
        return this.copyStateRepository.update(id, name.trim());
    }

    async deleteCopyState(id) {
        if (!id) {
            throw new Error("Copy State id is required");
        }
        return this.copyStateRepository.delete(id);
    }
}