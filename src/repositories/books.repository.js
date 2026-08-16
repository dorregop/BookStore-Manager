import { pool } from "../config/config.js";
import { Book } from "../models/Book.js";
export class BookRepository {
    async findAll() {
        const result = await pool.query(`SELECT id, title, author, category_id AS "categoryId", 
            saga, price, created_at AS "createdAt", updated_at AS "updatedAt" FROM book;`);
        return result.rows.map(row => new Book(row));
    }

    async findById(id) {
        const result = await pool.query(`SELECT id, title, author, category_id AS "categoryId", 
            saga, price, created_at AS "createdAt", updated_at AS "updatedAt" FROM book WHERE id = $1;`, [id]);
        return result.rows.length > 0 ? new Book(result.rows[0]) : undefined;
    }

    async create(book) {
        const result = await pool.query(`INSERT INTO book (title, author, category_id, saga, price) VALUES ($1, $2, $3, $4, $5) 
            RETURNING id, title, author, category_id AS "categoryId", saga, price, created_at AS "createdAt";`,
            [book.title, book.author, book.categoryId, book.saga, book.price]);
        return new Book(result.rows[0]);
    }

    async update(id, data) {
        const result = await pool.query(`UPDATE book SET title = $2, author = $3, category_id = $4, saga = $5, price = $6
            WHERE id = $1 RETURNING id, title, author, category_id AS "categoryId", saga, price, created_at AS "createdAt", updated_at 
            AS "updatedAt";`, [id, data.title, data.author, data.categoryId, data.saga, data.price]);
        if (result.rows.length === 0) {
            throw new Error("Book not found");
        }
        return new Book(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`DELETE FROM book WHERE id = $1 RETURNING 
        id, title, author, category_id as "categoryId", saga, price, created_at AS "createdAt", updated_at AS "updatedAt"`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Book not found");
        }
        return new Book(result.rows[0]);
    }
}