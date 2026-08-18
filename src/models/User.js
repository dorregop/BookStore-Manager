export class User {
    constructor({ id, name, email, password, roleId, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    update({ name, email, password }) {
        if (name !== undefined) {
            this.name = name;
        }

        if (email !== undefined) {
            this.email = email;
        }

        if (password !== undefined) {
            this.password = password;
        }
    }
}