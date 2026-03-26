import { TbUrgent } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useContact } from "../context/contactContext";
import { getInitials } from "../utils/getInitials";

const ContactCard = ({ contact }) => {
	const { setSeletedContact, deleteContact } = useContact();
	return (
		<div className="rounded-xl border flex flex-row align-center justify-between px-10 py-4">
			<div className="flex flex-row gap-4">
				<div className="w-14 h-14 flex text-3xl font-bold align-left items-center justify-center border rounded-full bg-[#]">
					{getInitials(contact)}
				</div>
				<div className="text-left">
					<div>
						{contact.first_name} {contact.last_name}
					</div>
					<div className="text-sm">📧 {contact.email || "No email"}</div>
					<div className="text-sm">☎️ {contact.phone_number || "No phone"}</div>
					<div className="text-sm">📝 {contact.notes || "No notes"}</div>
				</div>
			</div>
			<div className="flex flex-row justify-center items-center align-center gap-6 text-4xl">
				{contact.is_emergency_contact && <TbUrgent />}
				<Link to="/profile">
					<button type="button" onClick={() => setSeletedContact(contact)}>👀</button>
				</Link>
				<button onClick={() => deleteContact(contact.id)}>🗑️</button>
			</div>
		</div>
	);
};

export default ContactCard;
