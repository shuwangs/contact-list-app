import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ContactList from "../components/ContactList.jsx";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { RiContactsBook2Line } from "react-icons/ri";

const Dashboard = () => {
	const { currentUser } = useUser();
	const { fetchContacts, contacts } = useContact();
	const [showForm, setShowForm] = useState(false);
	useEffect(() => {
		const loadContacts = async () => {
			if (!currentUser?.id) return;

			try {
				await fetchContacts(currentUser.id);
			} catch (error) {
				console.error("Get Contacts failed:", error);
			}
		};

		loadContacts();
	}, [currentUser?.id]);

	useEffect(() => {
		console.log("Contacts updated: ", currentUser);
	}, [currentUser]);

	useEffect(() => {
		console.log("showForm:", showForm);
	}, [showForm]);

	useEffect(() => {
		console.log("Contacts updated: ", contacts);
	}, [contacts]);
	return (
		<div className="flex flex-col text-2xl m-16">
			<div className="flex flex-row mt-16 mb-8 justify-between items-center">
				<div className="flex flex-row items-center gap-4">				
					<RiContactsBook2Line />
					<h1 className="text-3xl color-[#0081a7]">Hello, {currentUser.name}</h1>
				</div>

				<button>Log Out</button>
			</div>

			<div className="flex flex-row justify-between mb-8 gap-4 ">
				<SearchBar />
				<button onClick={() => setShowForm(true)}>Add Contact</button>
			</div>
			{showForm && (
				<div className="mt-4">
					<ContactForm
						closeForm={() => setShowForm(false)}
						initialData={null}
						mode="new"
					/>
				</div>
			)}
			<div>
				<ContactList />
			</div>
		</div>
	);
};

export default Dashboard;
