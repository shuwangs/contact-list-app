import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ContactList from "../components/ContactList.jsx";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { RiContactsBook2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const { currentUser, logOut } = useUser();
	const { fetchContacts, contacts } = useContact();
	const [showForm, setShowForm] = useState(false);
	const navigator = useNavigate();

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

	const handleLogOut = () => {
		logOut();
		navigator('/');
	}

	if (!currentUser) {
		return <p>Loading user...</p>;
	}
	return (
		<div className="flex flex-col text-2xl m-16">
			<div className="flex flex-row mt-16 mb-8 justify-between items-center">
				<div className="flex flex-row items-center gap-4">
					<RiContactsBook2Line />
					<h1 className="text-3xl text-[#f07167] font-bold">Hello, {currentUser.name}</h1>
				</div>

				<button onClick={handleLogOut}>Log Out</button>
			</div>

			<div className="flex flex-row justify-between mb-8 gap-4 ">
				<SearchBar />
				<button onClick={() => setShowForm(true)}
					className="rounded-md border-2 bg-[#00afb9] text-[#fed9b7] px-4"
				>Add Contact</button>
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
