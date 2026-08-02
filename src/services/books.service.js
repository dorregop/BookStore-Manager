import { Book } from "../models/Book.js";
export class bookService {
    createBook(book) {
        this.libros.unshift(libro);
        this.guardarEnLocalStorage();
    }

    getBooks(){

    }

    getBookById(id) {
        return this.libros.find(
            libro => libro.id === id
        );
    }

    deleteBook(id) {
        this.libros = this.libros.filter(
            libro => libro.id !== id
        );
        this.guardarEnLocalStorage();
    }

    updateBook(id, datos) {
        const libro = this.buscarLibro(id);
        if (libro) {
            libro.actualizarDatos(datos);
            this.guardarEnLocalStorage();
        }
    }

    saveBook() {
        localStorage.setItem(
            "biblioteca",
            JSON.stringify(this.libros)
        );
    }

    loadBook() {
        const datos = localStorage.getItem("biblioteca");
        if (!datos) {
            return;
        }
        const libros = JSON.parse(datos);
        this.libros = libros.map(libro => new Libro(libro));
    }
}