import { CategoryRepository } from "../repositories/categories.repository.js";

export class CategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getCategories() {
        return this.categoryRepository.findAll();
    }

    async getCategoryById(id) {
        if (!id) {
            throw new Error("Category id is required");
        }
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    }

    async createCategory(name) {
        if (!name || name.trim() === "") {
            throw new Error("Category name is required");
        }
        return this.categoryRepository.create(name.trim());
    }

    async updateCategory(id, name) {
        if (!id) {
            throw new Error("Category id is required");
        }
        if (!name || name.trim() === "") {
            throw new Error("Category name is required");
        }
        return this.categoryRepository.update(id, name.trim());
    }

    async deleteCategory(id) {
        if (!id) {
            throw new Error("Category id is required");
        }
        return this.categoryRepository.delete(id);
    }
}