export class CopyState{
    constructor({ id, name, createdAt }){
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }

    getName(){
        return this.name;
    }
}