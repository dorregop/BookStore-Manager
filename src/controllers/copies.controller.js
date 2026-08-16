import { CopiesService } from "../services/copies.service.js";
export class CopiesController {
    constructor() {
        this.copiesService = new CopiesService();

        this.getCopies = this.getCopies.bind(this);
        this.getCopyById = this.getCopyById.bind(this);
        this.getCopiesByBookId = this.getCopiesByBookId.bind(this);
        this.createCopy = this.createCopy.bind(this);
        this.updateCopy = this.updateCopy.bind(this);
        this.deleteCopy = this.deleteCopy.bind(this);
    }

    async getCopies(req, res) {
        const copies = await this.copiesService.getCopies();
        res.status(200).json(copies);
    }

    async getCopyById(req, res) {
        const copy = await this.copiesService.getCopyById(req.params.id);
        res.status(200).json(copy);
    }

    async getCopiesByBookId(req, res) {
        const copies = await this.copiesService.getCopiesByBookId(req.params.bookId);
        res.status(200).json(copies);
    }

    async createCopy(req, res) {
        const copy = await this.copiesService.createCopy(req.body.bookId);
        res.status(201).json(copy);
    }

    async updateCopy(req, res) {
        const copy = await this.copiesService.updateCopy({id: req.params.id,...req.body});
        res.status(200).json(copy);
    }

    async deleteCopy(req, res) {
        const copy = await this.copiesService.deleteCopy(req.params.id);
        res.status(200).json(copy);
    }
}