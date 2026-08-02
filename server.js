import express from "express";
import { BooksRepository } from "./src/repositories/books.repository.js";

const app = express();

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});

app.get("/api/books", (req, res) => {
    const repository = new BooksRepository();
    repository.findAll().then(books => {
        res.json(books);
    });
});

app.get("/api/books/:id", (req, res) => {
    const repository = new BooksRepository();
    const { id } = req.params;
    repository.findById(id).then(book => {
        if (!book) {
            res.status(404).json({ error: "Book not found" });
            return;
        }
        res.json(book);
    });
});

app.post("/api/books", express.json(), (req, res) => {
    const repository = new BooksRepository();
    const bookData = req.body;
    repository.createBook(bookData).then(book => {
        res.status(201).json(book);
    });
});

app.put("/api/books/:id", express.json(), (req, res) => {
    const repository = new BooksRepository();
    const { id } = req.params;
    const bookData = req.body;
    repository.updateBook(id, bookData).then(book => {
        res.json(book);
    }).catch(err => {
        res.status(404).json({ error: err.message });
    });
});

app.delete("/api/books/:id", (req, res) => {
    const repository = new BooksRepository();
    const { id } = req.params;
    repository.deleteBook(id).then(() => {
        res.status(204).send();
    }).catch(err => {
        res.status(404).json({ error: err.message });
    });
});