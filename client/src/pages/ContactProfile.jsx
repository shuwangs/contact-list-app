import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContact } from "../context/contactContext";
import ContactForm from "../components/ContactForm.jsx";
import { getInitials } from "../utils/getInitials.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
const ContactProfile = () => {
	const mockContact = {
		id: 1,
		firstName: "Hone",
		lastName: "",
		email: "ag@gmail.com",
		phoneNumber: "12345",
		notes: "asdg",
	};
	const { selectedContact } = useContact();
	const { id } = useParams();
	const [showForm, setShowForm] = useState(false);
	const initial = getInitials(selectedContact);

	return (
		<div className="mx-auto max-w-[500px] font-medium py-20">

			<div className="text-xl ">
				<Link to="/dashboard">
					<button className="flex items-center gap-2 text-[#00afb9]">
						<IoMdArrowRoundBack className="text-xl" /> Back
					</button>
				</Link>
			</div>

			<div className="rounded-xl border-4 border-[#f07167] mt-8 py-8 px-8">
				{/* Card */}

				<div className="rounded-[14px] border bg-[#edf6f2] mb-6 flex items-center gap-5">
					<div className="flex rounded-full h-18 w-18 bg-[#fed9b7] items-center justify-center text-3xl text-[#0081a7]">
						{initial}
					</div>

					<div className="">
						<h1 className="text-3xl font-bold text-black">
							{selectedContact.first_name} {selectedContact.last_name}
						</h1>
					</div>
				</div>

				{/* Info blocks */}
				<div className="space-y-4 text-left">
					<div>
						<h3 className="text-xl text-[#0081a7] font-bold">Email</h3>
						<p className="text-md text-[#f07167] font-semibold">{selectedContact.email || "No email"}</p>
					</div>

					<div>
						<h3 className="text-xl text-[#0081a7] font-bold">Phone</h3>
						<p className="text-md text-[#f07167] font-semibold">
							{selectedContact.phone_number || "No phone number"}
						</p>
					</div>

					<div>
						<h3 className="text-xl text-[#0081a7] font-bold">Notes</h3>

						<p className="text-md text-[#f07167] font-semibold">
							{selectedContact.notes || "No notes"}
						</p>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-4 text-xl text-[#fdfcdc]">
					<button
						onClick={() => setShowForm(true)}
						className="mt-4 py-2 flex items-center justify-center gap-2 rounded-2xl border border-[#ff9b9b]
						 bg-[#0081a7]  hover:bg-[#00afb9]"
					>
						<RiEdit2Line /> Edit
					</button>
					<button className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#ff9b9b]
					 bg-[#f07167]  hover:bg-[#fed9b7] hover:text-[#00afb9]">
						<RiDeleteBin5Line className="text-xl" /> Delete
					</button>
				</div>
				{showForm && (
					<ContactForm
						closeForm={() => setShowForm(false)}
						initialData={selectedContact}
						mode="edit"
					/>
				)}
			</div>



		</div>

	);
};

export default ContactProfile;
