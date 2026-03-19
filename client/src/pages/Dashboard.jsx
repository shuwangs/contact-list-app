import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import ContactList from "../components/ContactList.jsx";

const Dashboard = () => {
    return (
        <div>
            <h1>Contact list App</h1>
            <div>
                <SearchBar /> 
                <button >Add Contact</button>
            </div>

            <div>
                <ContactList />
            </div>
        </div>
    )
}

export default Dashboard;