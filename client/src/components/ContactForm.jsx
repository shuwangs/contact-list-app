import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { validateForm } from "../utils/validateForm.js";
import ContactFormDiv from "./ui/ContactFormDiv.jsx";
import FormDiv from "./ui/FormDiv.jsx";
import FormLabel from "./ui/FormLabel.jsx";
import FormInput from "./ui/FormInput.jsx";

const ContactForm = ({ closeForm, initialData, mode }) => {
	const { currentUser } = useUser();
	const { addNewContact, editContact, loading, error, setError } = useContact();
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
		const validationErrors = validateForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setError(validationErrors);
			return;
		}
		try {
			if (mode === "edit" && initialData?.id) {
				console.log("editContact before: ", initialData?.id);
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
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="relative w-full max-w-2xl rounded-2xl border-2 bg-[#edf5f3] px-10 py-8 shadow-xl">
				<div className="flex justify-between font-bold text-[#0081a7] pb-5" >
					{mode === "new" ? <h3 >Add New Contact</h3> : <h3>Edit Contact</h3>}
					<button onClick={closeForm} className=" top-3 right-3 text-3xl ">
						<IoMdCloseCircleOutline />
					</button>
				</div>

				<div >
					<form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-2xl gap-4">
						<div className="flex flex-row gap-6 border-3 border-[#0081a7] rounded-xl py-4 justify-around bg-[#fdfcdc]">
							{/* First name */}
							<FormDiv className="border-2 border-[#00afb9]">
								<label
									htmlFor="firstName"
									className="mb-3 block text-xl font-semibold text-[#0081a7]"
								>
									First Name*
								</label>
								<input
									className="pl-4 text-[#f07167] "
									id="firstName"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									required
								/>
							</FormDiv>
							{/* Last name */}
							<FormDiv className="border-2 border-[#00afb9]">
								<FormLabel htmlFor="lastName">Last Name</FormLabel>

								<input
									className="pl-4 text-[#f07167] "
									value={formData.lastName}
									id="lastName"
									name="lastName"
									onChange={handleChange}
								/>
							</FormDiv>
						</div>
						{/* Email */}
						<ContactFormDiv>
							<label htmlFor="email">Email</label>
							<FormInput
								className="border-3"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange} />
						</ContactFormDiv>
						<ContactFormDiv>
							<label htmlFor="phoneNumber">Phone</label>
							<FormInput
								className="border-3"
								id="phoneNumber"
								name="phoneNumber"
								value={formData.phoneNumber}
								type="tel"
								placeholder="123-456-7890"
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								onChange={handleChange}
							/>
						</ContactFormDiv>

						<ContactFormDiv>
							<label htmlFor="isEmergencyContact">
								Is Emergency ?
								<input
									id="isEmergencyContact"
									name="isEmergencyContact"
									type="checkbox"
									checked={formData.isEmergencyContact}
									onChange={handleChange}
								/>

							</label>
						</ContactFormDiv>
						<ContactFormDiv>
							<label htmlFor="notes">Note</label>
							<textarea
								id="notes"
								name="notes"
								className="w-full rounded-xl border-3 border-[#0081a7] text-[#f07167] pl-4"
								value={formData.notes}
								onChange={handleChange}
							/>
						</ContactFormDiv>

						<button
							type="submit"
							className="w-full rounded-2xl bg-[#0081a7] px-6 py-4 text-xl font-bold text-[#fdfcdc]
							hover:bg-[#f07167]"
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

			</div >

		</div >
	);
};

export default ContactForm;
