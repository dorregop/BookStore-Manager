import { UserRepository } from "../repositories/users.repository.js";
import { RoleRepository } from "../repositories/role.repository.js";
export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
    }

    async getUsers() {
        return this.userRepository.findAll();
    }

    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async createUser(user) {
        if (!user) {
            throw new Error("User data is required");
        }
        if (!user.name || user.name.trim() === "") {
            throw new Error("User name is required");
        }
        if (!user.email || user.email.trim() === "") {
            throw new Error("User email is required");
        }
        if (!user.password || user.password.trim() === "") {
            throw new Error("User password is required");
        }
        if (!user.roleId) {
            throw new Error("Role ID is required");
        }
        const role = await this.roleRepository.findById(user.roleId);
        if (!role) {
            throw new Error("Role not found");
        }
        return this.userRepository.create(user);
    }

    async updateUser(id, userData) {
        if (!id) {
            throw new Error("User ID is required");
        }
        if (!userData) {
            throw new Error("User data is required");
        }
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (userData.name !== undefined) {
            if (userData.name.trim() === "") {
                throw new Error("User name cannot be empty");
            }
        }
        if (userData.email !== undefined) {
            if (userData.email.trim() === "") {
                throw new Error("User email cannot be empty");
            }
        }
        if (userData.password !== undefined) {
            if (userData.password.trim() === "") {
                throw new Error("User password cannot be empty");
            }
        }
        if (userData.roleId !== undefined) {
            const role = await this.roleRepository.findById(userData.roleId);
            if (!role) {
                throw new Error("Role not found");
            }
        }
        const updatedData = {
            name: userData.name?.trim() ?? existingUser.name,
            email: userData.email?.trim() ?? existingUser.email,
            password: userData.password ?? existingUser.password,
            roleId: userData.roleId ?? existingUser.roleId
        };
        return this.userRepository.update(id, updatedData);
    }

    async deleteUser(id) {
        if (!id) {
            throw new Error("User ID is required");
        }
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return await this.userRepository.delete(id);
    }
}