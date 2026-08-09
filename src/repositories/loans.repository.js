import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Loan } from "../models/Loan.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOANS_FILE = path.join(__dirname, "../data/loans.json");

export class LoanRepository {

    async findAll() {
        const data = await fs.readFile(LOANS_FILE, "utf-8");
        const loans = JSON.parse(data);
        return loans.map(loan => new Loan(loan));
    }

    async findById(id) {
        const loans = await this.findAll();
        const loan = loans.find(loan => loan.id === id);
        return loan;
    }

    async create(loan) {
        const newLoan = new Loan(loan);
        const loans = await this.findAll();
        loans.unshift(newLoan);
        await fs.writeFile(
            LOANS_FILE,
            JSON.stringify(loans, null, 2)
        );
        return newLoan;
    }

    async update(loan) {
        const loans = await this.findAll();
        const index = loans.findIndex(l => l.id === loan.id);
        if (index === -1) {
            throw new Error("Loan not found");
        }
        loans[index] = loan;
        await fs.writeFile(
            LOANS_FILE,
            JSON.stringify(loans, null, 2)
        );
        return loan;
    }

    async returnLoan(id) {
        const loans = await this.findAll();
        const loanIndex = loans.findIndex(loan => loan.id === id);
        if (loanIndex === -1) {
            throw new Error("Loan not found");
        }
        const loan = loans[loanIndex];
        if (!loan.returnCopy()) {
            throw new Error("Copy was not checked out");
        }
        await fs.writeFile(
            LOANS_FILE,
            JSON.stringify(loans, null, 2)
        );
        return loan;
    }
}