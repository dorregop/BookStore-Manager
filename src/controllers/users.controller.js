import { UserService } from "../services/user.service.js";
export class UserController {
    constructor() {
        this.userService = new UserService();

        this.getUsers = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async getUsers(req, res) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const status = error.message === "User not found" ? 404 : 500;
            res.status(status).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            const isClientError = error.message.includes("required") || error.message.includes("not found");
            res.status(isClientError ? 400 : 500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const status = error.message === "User not found" ? 404 : 400;
            res.status(status).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await this.userService.deleteUser(req.params.id);
            res.status(200).json({ message: "User deleted successfully", user });
        } catch (error) {
            const status = error.message === "User not found" ? 404 : 500;
            res.status(status).json({ error: error.message });
        }
    }
}