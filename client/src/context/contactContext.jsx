import React, {
	useEffect,
	useState,
	useContext,
	createContext,
	Children,
} from "react";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
	const [userContacts, setUserContacts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const values = {
		userContacts,
		loading,
		error,
	};

	return (
		<ContactContext.Provider value={values}>{children}</ContactContext.Provider>
	);
};

export const useContact = () => {
	const context = useContext(ContactContext);
	if (!context) {
		throw new Error("useContact must be used with a ContactProvider");
	}
	return context;
};
