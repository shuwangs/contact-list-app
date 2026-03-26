import { Pool } from "pg";
import dotenv from "dotenv";
// import pkg from "pg";

// const { Pool } = pkg;
dotenv.config();
const pool = new Pool({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	database: process.env.PGDATABASE,
	port: process.env.PGPORT,
});

pool
	.connect()
	.then(() => console.log("Database connected successfully"))
	.catch((err) => console.error("Database connection error:", err));

export default pool;
