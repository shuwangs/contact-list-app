import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import ContactList from "../components/ContactList.jsx";

const Dashboard = () => {
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
