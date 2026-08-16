import { BooksService } from "../services/books.service.js";
export class BookController {
    constructor(){
        this.bookService = new BooksService();

        this.getBooks = this.getBooks.bind(this);
        this.getBookById = this.getBookById.bind(this);
        this.createBook = this.createBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    async getBooks(req, res) {
        const books = await this.bookService.getBooks();
        res.status(200).json(books);
    }

    async getBookById(req, res) {
        const book = await this.bookService.getBookById(req.params.id);
        res.status(200).json(book);
    }

    async createBook(req, res) {
        console.log(req.body);
        const book = await this.bookService.createBook(req.body);
        res.status(201).json(book);
    }

    async updateBook(req, res) {
        const book = await this.bookService.updateBook(req.params.id, req.body);
        res.status(200).json(book);
    }

    async deleteBook(req, res){
        const book =  await this.bookService.deleteBook(req.params.id);
        res.status(200).json(book);
    }
}