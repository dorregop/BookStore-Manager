import { pool } from "../config/config.js";
import { User } from "../models/User.js";
export class UserRepository {
    async findAll() {
        const result = await pool.query(`
        SELECT id, name, email, role_id AS "roleId", created_at AS "createdAt", 
        updated_at AS "updatedAt" FROM users;`);
        return result.rows.map(row => new User(row));
    }

    async findById(id) {
        const result = await pool.query(`
        SELECT id, name, email, role_id AS "roleId", created_at AS "createdAt",
            updated_at AS "updatedAt" FROM users WHERE id = $1;`, [id]);
        return result.rows.length > 0 ? new User(result.rows[0]) : undefined;
    }

    async create(user) {
        const result = await pool.query(`INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role_id AS "roleId", created_at AS "createdAt", updated_at AS "updatedAt";`,
            [user.name, user.email, user.password, user.roleId]);
        return new User(result.rows[0]);
    }

    async update(id, data) {
        const result = await pool.query(`UPDATE users  SET name = $2, email = $3, password = $4, role_id = $5, 
            updated_at = CURRENT_TIMESTAMP WHERE id = $1
            RETURNING id, name, email, role_id AS "roleId", created_at AS "createdAt", updated_at AS "updatedAt";`,
            [id, data.name, data.email, data.password, data.roleId]);
        if (result.rows.length === 0) {
            throw new Error("User not found");
        }
        return new User(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`DELETE FROM users WHERE id = $1 
            RETURNING id, name, email, role_id AS "roleId", created_at AS "createdAt", updated_at AS "updatedAt";`, [id]);
        if (result.rows.length === 0) {
            throw new Error("User not found");
        }
        return new User(result.rows[0]);
    }
}