import React, { useState } from "react";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";

const ContactForm = () => {
	const { currentUser } = useUser();
	const { addNewContact, loading, error } = useContact();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		isEmergencyContact: false,
		notes: "",
	});
	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<div>
			<form className="space-y-6">
				<div className="flex flex-row gap-6">
					{/* First name */}
					<div className="rounded-xl border-2px border-teal-200 bg-white shadow-sm">
						<label
							htmlFor="firstName"
							className="mb-3 block text-xl font-semibold text-teal-700"
						>
							First Name*
						</label>
						<input id="firstName" onChange={handleChange} />
					</div>
					{/* Last name */}
					<div className="rounded-xl border-2px border-teal-200 bg-white shadow-sm">
						<label
							htmlFor="lastName"
							className="mb-3 block text-xl font-semibold text-teal-700"
						>
							Last Name
						</label>
						<input id="lastName" name="lastName" onChange={handleChange} />
					</div>
				</div>
				{/* Email */}
				<div>
					<label htmlFor="email">Email</label>
					<input id="email" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phone">Phone</label>
					<input id="phone" onChange={handleChange} />
				</div>

				<div>
					<label htmlFor="isEmergencyContact">
						<input
							id="isEmergencyContact"
							name="isEmergencyContact"
							type="checkbox"
							checked={formData.isEmergencyContact}
							onChange={handleChange}
						/>
						Emergency
					</label>
				</div>
				<label htmlFor="notes">Note</label>
				<textarea
					id="notes"
					name="notes"
					value={formData.notes}
					onChange={handleChange}
				/>

				<button type="submit" disabled={loading}>
					{loading ? "Adding..." : "Add Contact"}
				</button>

				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default ContactForm;
