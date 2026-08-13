import { RoleService } from "../services/category.service.js";

export class RoleController {
    constructor() {
        this.roleService = new RoleService();

        this.getRoles = this.getRoles.bind(this);
        this.getRoleById = this.getRoleById.bind(this);
        this.createRole = this.createRole.bind(this);
        this.updateRole = this.updateRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
    }

    async getRoles(req, res) {
        const roles = await this.roleService.getRoles();
        res.status(200).json(categories);
    }

    async getRoleById(req, res) {
        const role = await this.roleService.getRoleById(req.params.id);
        res.status(200).json(role);
    }

    async createRole(req, res) {
        const role = await this.roleService.createRole(req.body.name);
        res.status(201).json(role);
    }

    async updateRole(req, res) {
        const role = await this.roleService.updateRole(req.params.id, req.body.name);
        res.status(200).json(role);
    }

    async deleteRole(req, res) {
        const role = await this.roleService.deleteRole(req.params.id);
        res.status(200).json(role);
    }
}