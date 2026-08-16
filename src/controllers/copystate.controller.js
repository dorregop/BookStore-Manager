import { CopyStateService } from "../services/copystate.service.js";

export class CopyStateController {
    constructor() {
        this.copyStateService = new CopyStateService();

        this.getCopyStates = this.getCopyStates.bind(this);
        this.getCopyStateById = this.getCopyStateById.bind(this);
        this.createCopyState = this.createCopyState.bind(this);
        this.updateCopyState = this.updateCopyState.bind(this);
        this.deleteCopyState = this.deleteCopyState.bind(this);
    }

    async getCopyStates(req, res) {
        const copyStates = await this.copyStateService.getCopyStates();
        res.status(200).json(copyStates);
    }

    async getCopyStateById(req, res) {
        const copyState = await this.copyStateService.getCopyStatesById(req.params.id);
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

    async deleteCopyState(req, res) {
        const copyState = await this.copyStateService.deleteCopyState(req.params.id);
        res.status(200).json(copyState);
    }
}