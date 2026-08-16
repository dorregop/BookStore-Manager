import { CopyStateService } from "../services/copystate.service.js"
export class CopyStateController {
    constructor() {
        this.copyStateService = new CopyStateService();

        this.getCategories = this.getCategories.bind(this);
        this.getCategoryById = this.getCategoryById.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    async getCopyStates(req, res) {
        const copyStates = await this.copyStateService.getCopySates();
        res.status(200).json(copyState);
    }

    async getCopyStateById(req, res) {
        const copyState = await this.copyStateService.getCopySatesById(req.params.id);
        res.status(200).json(copyState);
    }

    async createCopyState(req, res) {
        const copyState = await this.copyStateService.createCopyState(req.body.name);
        res.status(201).json(copyState);
    }

    async updateCopyState(req, res) {
        const copyState = await this.copyStateService.updateCopyState(req.params.id, req.body.name);
        res.status(200).json(copyState);
    }

    async deleteCopyState(req, res){
        const copyState =  await this.copyStateService.deleteCopyState(req.params.id);
        res.status(200).json(copyState);
    }
}