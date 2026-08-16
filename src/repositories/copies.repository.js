import { Copy } from "../models/Copy.js";
import { pool } from "../config/config.js";

export class CopyRepository {
    async findAll() {
        const result = await pool.query(`
            SELECT id, book_id AS "bookId", state_id AS "stateId", created_at AS "createdAt", updated_at AS "updatedAt" FROM copy;`);
        return result.rows.map(row => new Copy(row));
    }

    async findById(id) {
        const result = await pool.query(`
            SELECT id, book_id AS "bookId", state_id AS "stateId", created_at AS "createdAt", updated_at AS "updatedAt"
            FROM copy WHERE id = $1; `, [id]);
        return result.rows.length > 0 ? new Copy(result.rows[0]) : undefined;
    }

    async create(copy) {
        const result = await pool.query(`INSERT INTO copy (book_id, state_id) VALUES ($1, $2)
            RETURNING id, book_id AS "bookId", state_id AS "stateId", created_at AS "createdAt", updated_at AS "updatedAt";`,
            [copy.bookId, copy.stateId]);
        return new Copy(result.rows[0]);
    }

    async findCopiesByBookId(bookId) {
        const result = await pool.query(`
            SELECT id, book_id AS "bookId", state_id AS "stateId", created_at AS "createdAt", updated_at AS "updatedAt"
            FROM copy WHERE book_id = $1;`, [bookId]);
        return result.rows.map(row => new Copy(row));
    }

    async update(copy) {
        const result = await pool.query(`
            UPDATE copy SET book_id = $2, state_id = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $1
            RETURNING id, book_id AS "bookId", state_id AS "stateId", created_at AS "createdAt", updated_at AS "updatedAt";`,
            [copy.id, copy.bookId, copy.stateId]);
        if (result.rows.length === 0) {
            throw new Error("Copy not found");
        }
        return new Copy(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`DELETE FROM copy WHERE id = $1
            RETURNING id, book_id AS "bookId", state_id AS "stateId", created_at AS "createdAt", updated_at AS "updatedAt";`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Copy not found");
        }
        return new Copy(result.rows[0]);
    }
}