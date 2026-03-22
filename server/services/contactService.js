import pool from "../db/db.js";

export const addContact = async (
	userId, firstName, lastName, email, phoneNumber, isEmergencyContact, notes
) => {
	const { rows } = await pool.query(
		`INSERT INTO contact_app.contacts(user_id, first_name, last_name, phone_number, email, notes, is_emergency_contact) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
		[
			userId, firstName, lastName, phoneNumber, email, notes, isEmergencyContact
		],
	);
	return rows[0].id;
};

export const getContactsByUserId = async (userId) => {
	const { rows } = await pool.query(
		`SELECT * FROM contact_app.contacts WHERE user_id = $1`,
		[userId],
	);
	return rows;
};

export const deleteContact = async (contactId) => {
	console.log("In contact seervice...")
	console.log("constact id ")
	const { rows } = await pool.query(
		`DELETE FROM contact_app.contacts WHERE id = $1
		RETURNING *`,
		[contactId],
	);
	console.log(rows);
	return rows[0];
};

export const updateContact = async (
	contactId,
	firstName,
	lastName,
	phoneNumber,
	email,
	notes,
	isEmergencyContact,
) => {
	const { rows } = await pool.query(
		`UPDATE contact_app.contacts 
         SET first_name = $1, last_name = $2, phone_number = $3, email = $4, notes = $5, is_emergency_contact = $6
         WHERE id = $7`,
		[
			firstName,
			lastName,
			phoneNumber,
			email,
			notes,
			isEmergencyContact,
			contactId,
		],
	);
	console.log(rows);
	return rows[0];
};
