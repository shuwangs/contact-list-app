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
			if (currentUser) {
				console.log("In dashboard currentUserId: ", currentUser.id);

				await fetchContacts(currentUser.id);
			}
		};

		loadContacts();

	}, [currentUser]);

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
					<ContactForm />
				</div>
			)}
			<div>
				<ContactList />
			</div>
		</div>
	);
};

export default Dashboard;
