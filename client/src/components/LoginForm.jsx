import React, { useState } from "react";
import { useUser } from "../context/userContext.jsx";
import "./LoginForm.css";

const LoginForm = () => {
	const { loading, error, login } = useUser();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		console.log("user entered is: ", formData);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("formData to submit", formData);
		await login(formData);
		console.log("User submit the login form");
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<div className="form-item">
					<label htmlFor="name">User Name</label>
					<input
						name="name"
						type="text"
						placeholder="bobo."
						required
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div className="form-item">
					<label htmlFor="email">User Email</label>
					<input
						name="email"
						type="email"
						placeholder="email@example.com"
						required
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div>
					<button type="submit">
						{loading ? "Loading..." : "Continue..."}
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
