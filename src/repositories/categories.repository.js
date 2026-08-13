import { pool } from "../config/config.js";
import { Category } from "../models/Category.js";

export class CategoryRepository {
    async findAll() {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt" FROM Category;`);
        return result.rows.map(row => new Category(row));
    }

    async findById(id) {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt" FROM Category WHERE id = $1;`, [id]);
        return result.rows.length > 0 ? new Category(result.rows[0]) : undefined;
    }

    async create(name) {
        const result = await pool.query(`INSERT INTO Category (name) VALUES ($1) 
            RETURNING id, name, created_at AS "createdAt";`, [name]);
        return new Category(result.rows[0]);
    }

    async update(id, name) {
        const result = await pool.query(`UPDATE Category SET name = $2 WHERE id = $1 
            RETURNING id, name, created_at AS "createdAt";`, [id, name]);
        if (result.rows.length === 0) {
            throw new Error("Category not found");
        }
        return new Category(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`DELETE FROM Category WHERE id = $1 
            RETURNING id, name, created_at AS "createdAt";`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Category not found");
        }
        return new Category(result.rows[0]);
    }
}