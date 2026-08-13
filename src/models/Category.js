export class Category {
    constructor({id, name, createdAt}) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}