import React from "react";

const ContactCard = ({ contact }) => {
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
			<div className="flex flex-row">
				<button>👀</button>
				<button>🗑️</button>
			</div>
		</div>
	);
};

export default ContactCard;
