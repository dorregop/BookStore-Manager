import { pool } from "../config/config.js";
import { ReservationStatus } from "../models/ReservationStatus.js";
export class ReservationStatusRepository {
    async findAll() {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt" FROM ReservationStatus;`);
        return result.rows.map(row => new ReservationStatus(row));
    }

    async findById(id) {
        const result = await pool.query(`SELECT id, name, created_at AS "createdAt" FROM ReservationStatus WHERE id = $1;`, [id]);
        return result.rows.length > 0 ? new ReservationStatus(result.rows[0]) : undefined;
    }

    async create(reservationStatus) {
        const result = await pool.query(`INSERT INTO ReservationStatus (name) VALUES ($1) 
                    RETURNING id, name, created_at AS "createdAt";`,
            [reservationStatus.name]);
        return new ReservationStatus(result.rows[0]);
    }

    async update(id, data) {
        const result = await pool.query(`UPDATE ReservationStatus SET name = $2 RETURNING id, name, created_at AS "createdAt";`,
            [id, data.name]);
        if (result.rows.length === 0) {
            throw new Error("ReservationStatus not found");
        }
        return new ReservationStatus(result.rows[0]);
    }

    async delete(id) {
        const result = await pool.query(`DELETE FROM ReservationStatus WHERE id = $1 
            RETURNING id, name, created_at AS "createdAt";`, [id]);
        if (result.rows.length === 0) {
            throw new Error("ReservationStatus not found");
        }
        return new ReservationStatus(result.rows[0]);
    }
}