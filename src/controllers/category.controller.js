import { CategoryService } from "../services/category.service.js";

export class CategoryController {
    constructor() {
        this.categoryService = new CategoryService();

        this.getCategories = this.getCategories.bind(this);
        this.getCategoryById = this.getCategoryById.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    async getCategories(req, res) {
        const categories = await this.categoryService.getCategories();
        res.status(200).json(categories);
    }

    async getCategoryById(req, res) {
        const category = await this.categoryService.getCategoryById(req.params.id);
        res.status(200).json(category);
    }

    async createCategory(req, res) {
        const category = await this.categoryService.createCategory(req.body.name);
        res.status(201).json(category);
    }

    async updateCategory(req, res) {
        const category = await this.categoryService.updateCategory(req.params.id, req.body.name);
        res.status(200).json(category);
    }

    async deleteCategory(req, res){
        const category =  await this.categoryService.deleteCategory(req.params.id);
        res.status(200).json(category);
    }
}