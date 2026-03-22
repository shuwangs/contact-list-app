import React from "react";
import { Link } from "react-router-dom";
import { useContact } from "../context/contactContext";
import { useUser } from "../context/userContext";
const ContactCard = ({ contact }) => {
	const { selectedContact, setSeletedContact, deleteContact } = useContact();
	return (
		<div className="flex flex-row justify-around">
			<div className="flex flex-row ">
				<div className="text-3xl font-bold pr-4">nameIcon</div>
				<div>
					<div>
						{contact.first_name} {contact.last_name}
					</div>
					<div>📧 {contact.email}</div>
					<div>📱 {contact.phone_number}</div>
					<div>📱 {contact.notes}</div>
				</div>
			</div>
			<div className="flex flex-row justify-center items-center align-center gap-6">
				<Link to="/profile">
					<button onClick={() => setSeletedContact(contact)} className="text-2xl">👀</button>
				</Link>
				<button className="text-2xl" onClick={() => deleteContact(contact.id)}>🗑️</button>
			</div>
		</div>
	);
};

export default ContactCard;
