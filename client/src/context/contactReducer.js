import { useActionState } from "react";

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

		default:
			throw new Error(`Unknow Action type: ${action.type}`);
	}
};
