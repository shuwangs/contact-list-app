import React, { useEffect } from "react";
import { useContact } from "../context/contactContext.jsx";
import { useUser } from "../context/userContext.jsx";
import ContactCard from "./ContactCard.jsx";

const ContactList = () => {
	const { contacts, loading, error } = useContact();
	const { authLoading } = useUser();



	if (authLoading) return <p>Restoring session...</p>;

	if (loading) return <p>Loading contacts...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="flex flex-col gap-4 pb-20">
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
