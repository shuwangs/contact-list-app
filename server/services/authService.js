import pool from "../db/db.js";

export const getUserByEmail = async (email) => {
	console.log("Server: getUserByEmail", email);

	const { rows } = await pool.query(
		`SELECT * FROM contact_app.users WHERE email = $1`,
		[email],
	);
	console.log(rows);
	return rows[0];
};

export const createUser = async (name, email) => {
	console.log("In createUser func");
	const { rows } = await pool.query(
		`INSERT INTO contact_app.users(name, email)
		 VALUES ($1, $2)
		 RETURNING *`,
		[name, email],
	);
	console.log("output from in createUser:", rows);
	return rows[0];
};

export const registerUser = async (name, email) => {
	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		throw new Error("User already exists");
	}
	const newUser = await createUser(name, email);
	console.log("new user just created :", newUser);
	return newUser;
};

export const loginUser = async (email) => {
	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		throw new Error("No account found with this email");
	}

	return existingUser;
};
