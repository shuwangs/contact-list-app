
import {pool } from '../db/db.js';

export const registerUser = async (name, email) => {
    const { rows } = await pool.query(
        `INSERT INTO users(name, email) VALUES ($1, $2) RETURNING id`,
        [name, email]
    );
    console.log(rows);
    return rows[0].id;
};

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    console.log(rows);
    return rows[0];
};

        