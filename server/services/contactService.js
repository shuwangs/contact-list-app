import pool from "../db/db.js";

export const addContact = async (
	userId, firstName, lastName, email, phoneNumber, isEmergencyContact, notes, tag
) => {
	console.log("contactService.. before adding to db", userId)
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		const contactRes = await client.query(
			`INSERT INTO contact_app.contacts
			(user_id, first_name, last_name, phone_number, email, notes, is_emergency_contact) 
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			RETURNING id`,
			[
				userId, firstName, lastName, phoneNumber, email, notes, isEmergencyContact
			],
		)
		console.log("In contact service, the contacct Res: ", contactRes);
		const contactId = contactRes.rows[0].id;

		if (tag) {
			const tagResult = await client.query(
				`SELECT id
				 FROM contact_app.tags
				 WHERE name = $1`,
				[tag]
			);

			if (tagResult.rows.length > 0) {
				const tagId = tagResult.rows[0].id;

				await client.query(
					`INSERT INTO contact_app.contact_tags (contact_id, tag_id)
					 VALUES ($1, $2)`,
					[contactId, tagId]
				);
			}
		}
		await client.query("COMMIT");
		return contactId;
	}
	catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}
};

export const getContactsByUserId = async (userId) => {
	const { rows } = await pool.query(
		`SELECT c.*, t.name as tag 
		FROM contact_app.contacts c 
		LEFT JOIN contact_app.contact_tags ct 
			ON c.id = ct.contact_id
		LEFT JOIN contact_app.tags t 
			ON ct.tag_id = t.id
		WHERE user_id = $1`,
		[userId],
	);
	console.log("get contacts by user ID. result: ", rows);
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

export const updateContact = async (id, firstName, lastName, email, phoneNumber, isEmergencyContact, notes) => {
	const { rows } = await pool.query(
		`UPDATE contact_app.contacts 
         SET first_name = $1, last_name = $2, phone_number = $3, email = $4, notes = $5, is_emergency_contact = $6
         WHERE id = $7 returning *`,
		[
			firstName,
			lastName,
			phoneNumber,
			email,
			notes,
			isEmergencyContact,
			id,
		],
	);
	console.log(rows[0]);
	return rows[0];
};


export const searchContactsByUserId = async ({ userId, keyword }) => {
	console.log("Searching in db...");
	const searchTerm = `%${keyword.toLowerCase()}%`

	const { rows } = await pool.query(
		`SELECT * FROM contact_app.contacts 
		WHERE user_id = $1
		AND (
		first_name ILIKE $2 
		OR last_name ILIKE $2
		OR email ILIKE $2
		OR phone_number ILIKE $2
		OR notes ILIKE $2) `,
		[userId, searchTerm],
	);
	return rows;
};
