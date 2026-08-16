import { pool } from "../config/config.js";
import { CopyState } from "../models/CopyState.js";

export class CopyStateRepository {
    async findAll() {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt", updated_at AS "updatedAt" FROM copy_state;`);
        return result.rows.map(row => new CopyState(row));
    }

    async findById(id) {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt", updated_at AS "updatedAt" 
            FROM copy_state WHERE id = $1;`, [id]);
        return result.rows.length > 0 ? new CopyState(result.rows[0]) : undefined;
    }

    async findByName(name) {
        const result = await pool.query(`
            SELECT id, name, created_at AS "createdAt", updated_at AS "updatedAt"
            FROM copy_state WHERE name = $1;`, [name]);
        return result.rows.length > 0 ? new CopyState(result.rows[0]) : undefined;
    }

    async create(name) {
        const result = await pool.query(`
            INSERT INTO copy_state (name) VALUES ($1)
            RETURNING id, name, created_at AS "createdAt", updated_at AS "updatedAt";`, [name]);
        return new CopyState(result.rows[0]);
    }

    async update(id, name) {
        const result = await pool.query(`
            UPDATE copy_state SET name = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1
            RETURNING id, name, created_at AS "createdAt", updated_at AS "updatedAt";`, [id, name]);
        if (result.rows.length === 0) {
            throw new Error("Copy State not found");
        }
        return new CopyState(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`
            DELETE FROM copy_state WHERE id = $1
            RETURNING id, name, created_at AS "createdAt", updated_at AS "updatedAt";`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Copy State not found");
        }
        return new CopyState(result.rows[0]);
    }
}