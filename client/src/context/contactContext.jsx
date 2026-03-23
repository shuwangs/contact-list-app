import React, {
	useEffect,
	useState,
	useContext,
	createContext,
	Children,
	useReducer,
} from "react";
import { contactReducer, initialContactState } from "./contactReducer";
import {
	getContacts,
	updateContactById,
	createContact,
	deleteContactById,
} from "../api/contactApi.js";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contactReducer, initialContactState);
	const { contacts, error, loading } = state;
	const [selectedContact, setSeletedContact] = useState(null);
	const fetchContacts = async (userId) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_ERROR", payload: "" });

			const result = await getContacts(userId);

			console.log("In contactContext: the result of getContacts is: ", result);
			dispatch({ type: "SET_CONTACTS", payload: result });

			console.log(
				"In contactContext: after getContacts the contacts",
				contacts,
			);
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: error.message });
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};

	const addNewContact = async (userId, newContact) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_ERROR" });
			const result = await createContact(newContact);
			console.log("In contactContexts addNewContact result: ", result);

			dispatch({ type: "ADD_CONTACT", payload: result });

			await fetchContacts(userId);
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: error.message });
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};
	const editContact = async (contactId, updatedContact) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_ERROR" });
			const result = await updateContactById(contactId, updatedContact);
			dispatch({ type: "UPDATE_CONTACT", payload: result.data });
			setSeletedContact(result.data);
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: error.message });
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};
	const deleteContact = async (contactId) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_ERROR" });
			const result = await deleteContactById(contactId);
			dispatch({ type: "DELETE_CONTACT", payload: result.data.id });

			// await fetchContacts(currentUser);
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: error.message });
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};

	const values = {
		contacts: state.contacts,
		loading: state.loading,
		error: state.error,
		selectedContact,
		setSeletedContact,
		fetchContacts,
		addNewContact,
		editContact,
		deleteContact,
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
