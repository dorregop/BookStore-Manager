import { SaleRepository } from "../repositories/sales.repository.js";
import { UserRepository } from "../repositories/users.repository.js";
import { CopyRepository } from "../repositories/copy.repository.js";
export class SaleService {
    constructor() {
        this.saleRepository = new SaleRepository();
        this.userRepository = new UserRepository();
        this.copyRepository = new CopyRepository();
    }

    async createSale(saleData) {
        return this.saleRepository.create(saleData);
    }

    async getSales() {
        return this.saleRepository.findAll();
    }

    async getSaleById(id) {
        return this.saleRepository.findById(id);
    }
}