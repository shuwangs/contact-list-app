import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import FormDiv from "./ui/FormDiv.jsx";
import FormLabel from "./ui/FormLabel.jsx";
const ContactForm = () => {
	const { currentUser } = useUser();
	const { addNewContact, loading, error } = useContact();
	const [formData, setFormData] = useState({
		userId: currentUser,
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

	useEffect(() => {
		console.log(formData);
	}, [formData]);
	return (
		<div className="fixed  w-125 rounded-2xl bg-[#edf5f3] border-2 px-6 py-8">
			<form
				onSubmit={() => addNewContact(formData)}
				className="mx-auto max-w-2xl"
			>
				<div className="flex flex-row gap-6 ">
					{/* First name */}
					<div className="rounded-xl border-2px border-[#8ee9dc] bg-white shadow-sm">
						<label
							htmlFor="firstName"
							className="mb-3 block text-xl font-semibold text-teal-700"
						>
							First Name*
						</label>
						<input
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
						/>
					</div>
					{/* Last name */}
					<FormDiv className="bg-black">
						<FormLabel htmlFor="lastName">
							Last Name
						</FormLabel>

						<input
							value={formData.lastName}
							id="lastName"
							name="lastName"
							onChange={handleChange}
						/>
					</FormDiv>
				</div>
				{/* Email */}
				<div className="mb-3 block text-xl font-semibold text-teal-700">
					<label htmlFor="email">Email</label>
					<input id="email" name="email" onChange={handleChange} />
				</div>
				<div className="mb-3 block text-xl font-semibold text-teal-700">
					<label htmlFor="phoneNumber">Phone</label>
					<input
						id="phoneNumber"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-3 block text-xl font-semibold text-teal-700">
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
				<div className="mb-3 block text-xl font-semibold text-teal-700">
					<label htmlFor="notes">Note</label>
					<textarea
						id="notes"
						name="notes"
						className="w-full rounded-2xl border border-[#8ee9dc] text-teal-500"
						value={formData.notes}
						onChange={handleChange}
					/>
				</div>

				<button
					type="submit"
					className="w-full rounded-2xl bg-[#2fcfcb] px-6 py-4 text-xl font-bold text-white"
					disabled={loading}
				>
					{loading ? "Creating..." : "Create Contact ✓"}
				</button>

				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default ContactForm;
