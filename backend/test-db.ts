import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });

async function testConnection() {
  try {
    console.log("Attempting to connect to:", connectionString);
    const client = await pool.connect();
    console.log("Successfully connected to the database!");
    const res = await client.query("SELECT NOW()");
    console.log("Current time from DB:", res.rows[0]);
    client.release();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Connection error:", errorMessage);
  } finally {
    await pool.end();
  }
}

testConnection();
