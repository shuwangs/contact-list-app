import pool from "../db/db.js";

export const registerUser = async (name, email) => {
	const { rows } = await pool.query(
		`INSERT INTO contact_app.users(name, email) VALUES ($1, $2) RETURNING id`,
		[name, email],
	);
	console.log(rows);
	return rows[0].id;
};

export const getUserByEmail = async (email) => {
	console.log("Server: getUserByEmail", email);

	const {rows} = await pool.query(
		`SELECT * FROM contact_app.users WHERE email = $1`,
		[email],
	);
	console.log(rows);
	return rows[0];
};

export const findOrCreateUser = async (name, email) => {
	console.log("Server: looking for the user", name);
	const existingUser = await getUserByEmail(email);
	console.log("Server: find existing user", email);

	if (existingUser) {
		console.log("User exist", existingUser);
		return existingUser;
	}
	const newUser = await registerUser(name, email);
	console.log("New user created: ", newUser);
	return newUser;
};
