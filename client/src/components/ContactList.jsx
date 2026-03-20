import React, { useEffect } from "react";
import { useContact } from "../context/contactContext.jsx";
import ContactCard from "./ContactCard.jsx";

const ContactList = () => {
	const { contacts, loading, error } = useContact();

	useEffect(() => {
		console.log("contacts are: ", contacts);
	}, [contacts]);

	if (loading) return <p>Loading contacts...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			{contacts.length === 0 ? (
				<p>Start adding Contact</p>
			) : (
				contacts.map((contact) => (
					<ContactCard key={contact.id} contact={contact} />
				))
			)}
		</div>
	);
};

export default ContactList;
