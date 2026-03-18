import pool from "../db/db.js";

export const getAllUsers = async() =>{
    const {rows} = await pool.query(
        `SELECT * FROM contact_app.users`
    )
    console.log(rows);
    return rows;
}