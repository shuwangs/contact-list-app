import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import { IoMdCloseCircleOutline } from "react-icons/io";

import FormDiv from "./ui/FormDiv.jsx";
import FormLabel from "./ui/FormLabel.jsx";
const ContactForm = ({ closeForm, initialData, mode }) => {
	const { currentUser } = useUser();
	const { addNewContact, editContact, loading, error } = useContact();
	const [formData, setFormData] = useState({
		userId: currentUser.id,
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

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (mode === "edit" && initialData?.id) {
				console.log("editContact before: ", initialData?.id)
				await editContact(initialData.id, formData);
				console.log("editContact finished");
			} else {
				await addNewContact(currentUser.id, formData);
				console.log("addNewContact finished");
			}

			closeForm();
			console.log("closeForm called");
		} catch (error) {
			console.error("submit failed:", error);
		}
	};
	useEffect(() => {
		if (mode === "edit" && initialData) {
			setFormData({
				userId: initialData.user_id || currentUser?.id || "",
				firstName: initialData.first_name || "",
				lastName: initialData.last_name || "",
				email: initialData.email || "",
				phoneNumber: initialData.phone_number || "",
				isEmergencyContact: initialData.is_emergency_contact || false,
				notes: initialData.notes || "",
			});
		} else {
			setFormData({
				userId: currentUser?.id || "",
				firstName: "",
				lastName: "",
				email: "",
				phoneNumber: "",
				isEmergencyContact: false,
				notes: "",
			});
		}
	}, [mode, initialData, currentUser]);
	return (
		<div className="fixed w-125 rounded-2xl bg-[#edf5f3] border-2 px-6 py-8">
			<div>
				<button
					onClick={closeForm}
					className="absolute top-3 right-3 text-xl"
				>
					<IoMdCloseCircleOutline />
				</button>

			</div>


			<form
				onSubmit={handleSubmit}
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
					<input id="email" name="email"
						value={formData.email} onChange={handleChange} />
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
					{loading
						? mode === "edit"
							? "Saving..."
							: "Creating..."
						: mode === "edit"
							? "Save Changes"
							: "Create Contact ✓"}
				</button>

				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default ContactForm;
