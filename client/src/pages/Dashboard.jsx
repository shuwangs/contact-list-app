import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ContactList from "../components/ContactList.jsx";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import ContactForm from "../components/ContactForm.jsx";
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
		<div className="flex flex-col ">
			<h1>Contact list App</h1>
			<div className="flex flex-row justify-center">
				<SearchBar />
				<button onClick={() => setShowForm(true)}>Add Contact</button>
			</div>
			{showForm && (
				<div className="mt-4">
					<ContactForm closeForm={() => setShowForm(false)} />
				</div>
			)}
			<div>
				<ContactList />
			</div>
		</div>
	);
};

export default Dashboard;
