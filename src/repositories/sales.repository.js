import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Sale } from "../models/Sale.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SALES_FILE = path.join(__dirname, "../data/sales.json");

export class SaleRepository {
    async findAll() {
        const data = await fs.readFile(SALES_FILE, "utf-8");
        const sales = JSON.parse(data);
        return sales.map(sale => new Sale(sale));
    }

    async findById(id) {
        const sales = await this.findAll();
        const sale = sales.find(sale => sale.id === id);
        return sale;
    }

    async create(saleData) {
        const newSale = new Sale(saleData);
        const sales = await this.findAll();
        sales.unshift(newSale);
        await fs.writeFile(
            SALES_FILE,
            JSON.stringify(sales, null, 2)
        );
        return newSale;
    }
}