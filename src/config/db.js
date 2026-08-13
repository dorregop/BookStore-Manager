import { pool } from "../config/config"

try {
    const result = await pool.query("SELECT NOW() AS fecha");
    console.log(result.rows);
} catch (error) {
    console.error(error);
} finally {
    await pool.end();
}