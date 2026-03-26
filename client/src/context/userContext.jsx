import React, { useState, useEffect, useContext, createContext } from "react";
import { loginUser, registerUser } from "../api/loginApi.js";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [authLoading, setAuthLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		const savedUser = localStorage.getItem("currentUser");
		const savedToken = localStorage.getItem("token");

		if (savedUser && savedToken) {
			setCurrentUser(JSON.parse(savedUser));
		}
		setAuthLoading(false);

	}, []);

	const login = async (payload) => {
		try {
			setError("");
			setLoading(true);

			const result = await loginUser(payload);

			console.log("Logined in user are: ", result);
			setCurrentUser(result.user);
			localStorage.setItem("currentUser", JSON.stringify(result.user));
			localStorage.setItem("token", result.token);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};
	const register = async (payload) => {
		try {
			setError("");
			setLoading(true);

			const result = await registerUser(payload);

			console.log("registered in user are: ", result);
			setCurrentUser(result.newUser);
			localStorage.setItem("currentUser", JSON.stringify(result.newUser));
			localStorage.setItem("token", result.token);
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
		localStorage.removeItem("token");
	}

	const values = {
		currentUser,
		loading,
		authLoading,
		error,
		login,
		register,
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
