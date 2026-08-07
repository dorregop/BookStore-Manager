import bookService from "../services/books.service.js";

app.get("/api/books", (req, res) => {
    bookService.getBooks().then(books => {
        res.json(books);
    });
});

app.get("/api/books/:id", (req, res) => {
    bookService.getBookById(req.params.id).then(book => {
        if (!book) {
            res.status(404).json({ error: "Book not found" });
            return;
        }
        res.json(book);
    });
});

app.post("/api/books", express.json(), (req, res) => {
    const bookData = req.body;
    bookService.createBook(bookData).then(book => {
        res.status(201).json(book);
    });
});

app.put("/api/books/:id", express.json(), (req, res) => {
    const { id } = req.params;
    const bookData = req.body;
    bookService.updateBook(id, bookData).then(book => {
        res.json(book);
    }).catch(err => {
        res.status(404).json({ error: err.message });
    });
});

app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    bookService.deleteBook(id).then(() => {
        res.status(204).send();
    }).catch(err => {
        res.status(404).json({ error: err.message });
    });
});