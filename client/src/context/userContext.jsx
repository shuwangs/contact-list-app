import React, { useState, useEffect, useContext, createContext } from "react";
import { loginUser } from "../api/loginApi.js";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		const savedUser = localStorage.getItem("currentUser");

		if (savedUser) {
			setCurrentUser(JSON.parse(savedUser));
		}
	}, []);
	const login = async (payload) => {
		try {
			setError("");
			setLoading(true);
			const user = await loginUser(payload);
			console.log("Logined in user are: ", user);
			setCurrentUser(user);
			localStorage.setItem("currentUser", JSON.stringify(user));
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const logOut = () => {
		setCurrentUser(null);
		setError("");
		localStorage.removeItem("currentUser");
	}

	const values = {
		currentUser,
		loading,
		error,
		login,
		logOut
	};

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used with a UserProvider");
	}
	return context;
};
