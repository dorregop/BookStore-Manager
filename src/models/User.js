export class User {
    constructor({ firstName, lastName, email, role, id}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    update({ firstName, lastName, email }) {
        if (firstName !== undefined) {
            this.firstName = firstName;
        }
        if (lastName !== undefined) {
            this.lastName = lastName;
        }
        if (email !== undefined) {
            this.email = email;
        }
    }

    changeRole(newRole) {
        if (!Object.values(ROLES).includes(newRole)) {
            return false;
        }
        this.role = newRole;
        return true;
    }
}