import React, { useState } from "react";
import { useUser } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import FormLabel from "./ui/FormLabel.jsx";
import FormInput from "./ui/FormInput.jsx"
import FormBtn from "./ui/FormBtn.jsx";
import { FaLongArrowAltRight } from "react-icons/fa";


const LoginForm = () => {
	const { loading, error, login } = useUser();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		console.log("user entered is: ", formData);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("formData to submit", formData);
		try {
			await login(formData);
			console.log("User submit the login form");

			navigate("/dashboard");
		} catch (error) {
			console.log("login failed:", error);
		}
	};



	return (
		<div className="flex justity-center items-center text-left g-2">
			<form onSubmit={handleSubmit} className=" w-full space-y-5">
				<div className="form-item">
					<FormLabel htmlFor="name">Name</FormLabel>
					<FormInput
						name="name"
						type="text"
						placeholder="bobo."
						required
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div className="form-item">
					<FormLabel htmlFor="email">User Email</FormLabel>
					<FormInput
						name="email"
						type="email"
						placeholder="bobo@example.com"
						required
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div>
					<FormBtn
						className="flex items-center gap-2 justify-center"
						type="submit">
						{loading ? "Loading..." : <>Continue <FaLongArrowAltRight /></>
						}
					</FormBtn>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
