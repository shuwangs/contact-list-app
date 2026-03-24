import React from "react";
import { Link } from "react-router-dom";
import { useContact } from "../context/contactContext";
import { useUser } from "../context/userContext";
import { getInitials } from "../utils/getInitials";
import { TbUrgent } from "react-icons/tb";

const ContactCard = ({ contact }) => {
	const { selectedContact, setSeletedContact, deleteContact } = useContact();
	return (
		<div className="rounded-xl border flex flex-row align-center justify-between px-10">
			<div className="flex flex-row gap-4">
				<div className="w-14 h-14 flex text-3xl font-bold align-left items-center justify-center border rounded-full bg-[#]">
					{getInitials(contact)}
				</div>
				<div className="text-left">
					<div>
						{contact.first_name} {contact.last_name}
					</div>
					<div>📧 {contact.email || "No email"}</div>
					<div>☎️ {contact.phone_number || "No phone"}</div>
					<div>📝 {contact.notes || "No notes"}</div>
				</div>
			</div>
			<div className="flex flex-row justify-center items-center align-center gap-6">
				{contact.is_emergency_contact && <TbUrgent />}
				<Link to="/profile">
					<button
						onClick={() => setSeletedContact(contact)}
						className="text-2xl"
					>
						👀
					</button>
				</Link>
				<button className="text-2xl" onClick={() => deleteContact(contact.id)}>
					🗑️
				</button>
			</div>
		</div>
	);
};

export default ContactCard;
