import { useReducer } from "react";

export const initialContactState = {
	contacts: [],
	loading: false,
	error: "",
};

export const contactReducer = (state, action) => {
	switch (action.type) {
		case "SET_CONTACTS":
			return {
				...state,
				contacts: action.payload,
			};

		case "ADD_CONTACT":
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
			};
		case "UPDATE_CONTACT":
			return {
				...state,
				contacts: state.contacts.map((contact) => {
					return contact.id === action.payload.id ? action.payload : contact;
				}),
			};
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact.id !== action.payload.id;
				}),
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};

		default:
			throw new Error(`Unknown Action type: ${action.type}`);
	}
};
