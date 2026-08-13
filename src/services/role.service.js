import { RoleRepository } from "../repositories/role.repository.js";

export class RoleService {
    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async getRoles() {
        return this.roleRepository.findAll();
    }

    async getRoleById(id) {
        if (!id) {
            throw new Error("Role id is required");
        }
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new Error("Role not found");
        }
        return role;
    }

    async createRole(name) {
        if (!name || name.trim() === "") {
            throw new Error("Role name is required");
        }
        return this.roleRepository.create(name.trim());
    }

    async updateRole(id, name) {
        if (!id) {
            throw new Error("Role id is required");
        }
        if (!name || name.trim() === "") {
            throw new Error("Role name is required");
        }
        return this.roleRepository.update(id, name.trim());
    }

    async deleteRole(id) {
        if (!id) {
            throw new Error("Role id is required");
        }
        return this.roleRepository.delete(id);
    }
}