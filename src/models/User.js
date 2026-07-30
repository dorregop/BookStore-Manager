export class User {
    constructor({ firstName, lastName, email, role = ROLES.CUSTOMER, id = crypto.randomUUID() }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    changeRole(){

    }
}