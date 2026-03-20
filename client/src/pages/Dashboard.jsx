import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ContactList from "../components/ContactList.jsx";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";

const Dashboard = () => {
	const { currentUser } = useUser();
	const { fetchContacts, contacts } = useContact();

	useEffect(() => {
		const loadContacts = async () => {
			if (currentUser) {
				await fetchContacts(currentUser);
			}
			console.log("currentUserId: ", currentUser);
			console.log("Contacts: ", contacts);
		};

		loadContacts();
	}, [currentUser]);

	return (
		<div className="flex flex-col ">
			<h1>Contact list App</h1>
			<div className="flex flex-row justify-center">
				<SearchBar />
				<button>Add Contact</button>
			</div>

			<div>
				<ContactList />
			</div>
		</div>
	);
};

export default Dashboard;
