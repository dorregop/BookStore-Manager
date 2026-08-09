import { User } from "../models/user.model.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, "../data/users.json");

export class UserRepository {
    async findAll() {
        const data = await fs.readFile(USERS_FILE, "utf-8");
        const users = JSON.parse(data);
        return users.map(user => new User(user));
    }

    async findById(id) {
        const users = await this.findAll();
        const user = users.find(user => user.id === id);
        return user;
    }

    async create(user) {
        const newUser = new User(user);
        const users = await this.findAll();
        users.push(newUser);
        await fs.writeFile(
            USERS_FILE,
            JSON.stringify(users, null, 2)
        );
        return newUser;
    }

    async update(user, data) {
        user.update(data);
        return user;
    }

    async changeRole(user, newRole) {
        const result = user.changeRole(newRole);
        return result;
    }
}