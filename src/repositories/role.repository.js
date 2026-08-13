import { pool } from "../config/config.js";
import { Role } from "../models/Role.js";

export class RoleRepository {
    async findAll() {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt" FROM Role ORDER BY id;`);
        return result.rows.map(row => new Role(row));
    }

    async findById(id) {
        const result = await pool.query(`SELECT id, name, created_at AS createdAt FROM Role WHERE id = $1;`, [id]);
        return result.rows.length > 0 ? new Role(result.rows[0]) : undefined;
    }

    async create(name) {
        const result = await pool.query(`INSERT INTO Role (name) VALUES ($1) 
                    RETURNING id, name, created_at AS "createdAt";`, [name]);
        return new Role(result.rows[0]);
    }

    async update(id, name) {
        const result = await pool.query(`UPDATE Role SET name = $2 WHERE id = $1 
                    RETURNING id, name, created_at AS "createdAt";`, [id, name]);
        if (result.rows.length === 0) {
            throw new Error("Role not found");
        }
        return new Role(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`DELETE FROM Role WHERE id = $1 
                    RETURNING id, name, created_at AS "createdAt";`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Role not found");
        }
        return new Role(result.rows[0]);
    }
}