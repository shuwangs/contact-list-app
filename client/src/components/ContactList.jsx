import React, { useEffect } from "react";
import { useContact } from "../context/contactContext.jsx";
import { useUser } from '../context/userContext.jsx';
import ContactCard from "./ContactCard.jsx";

const ContactList = () => {
	const { contacts, fetchContacts, loading, error } = useContact();
	const { currentUser } = useUser();

	useEffect(() => {
		fetchContacts(currentUser);
		console.log("contacts are: ", contacts);
	}, [currentUser]);

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
