import LoanRepository from '../repositories/loan.repository.js';
import CopyRepository from '../repositories/copy.repository.js';
import UserRepository from '../repositories/users.repository.js';
import { STATES } from '../config/index.js';
export class LoanService {
    constructor() {
        this.loanRepository = new LoanRepository();
        this.copyRepository = new CopyRepository();
        this.userRepository = new UserRepository();
    }

    async getLoans() {
        return this.loanRepository.findAll();
    }

    async getLoanById(id) {
        return this.loanRepository.findById(id);
    }

    async createLoan(loanData) {
        if (!loanData.userId || !loanData.copyId) {
            throw new Error("Missing required fields: userId and copyId");
        }
        const copy = await this.copyRepository.findById(loanData.copyId);
        if (!copy) {
            throw new Error("Copy not found");
        }
        if (!copy.isAvailable()) {
            throw new Error("Copy unavailable and cannot be checked out");
        }
        const user = await this.userRepository.findById(loanData.userId);
        if (!user) {
            throw new Error("User not found");
        }
        copy.changeState(STATES.LOANED);
        await this.copyRepository.update(copy);
        return this.loanRepository.create(loanData);
    }

    async returnLoan(id) {
        const loan = await this.loanRepository.findById(id);
        if (!loan) {
            throw new Error("Loan not found");
        }
        const copy = await this.copyRepository.findById(loan.copyId);
        if (!copy) {
            throw new Error("Copy not found");
        }
        if (!copy.isLoaned()) {
            throw new Error("Copy is not currently loaned out");
        }
        loan.returnCopy();
        copy.changeState(STATES.AVAILABLE);
        await this.copyRepository.update(copy);
        return this.loanRepository.update(loan);
    }
}