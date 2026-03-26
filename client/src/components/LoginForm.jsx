import React, { useState } from "react";
import { useUser } from "../context/userContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import FormLabel from "./ui/FormLabel.jsx";
import FormInput from "./ui/FormInput.jsx";
import FormBtn from "./ui/FormBtn.jsx";
import { FaLongArrowAltRight } from "react-icons/fa";

const LoginForm = () => {
	const { loading, error, login, register } = useUser();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});
	const [authMode, setAuthMode] = useState("login")
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
			if (authMode === "login") {
				await login(formData);
				console.log("User submit the login form");
			} else {
				await register(formData)
			}

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

				{authMode === "login" && <div>
					<FormBtn
						className="flex items-center gap-2 justify-center"
						type="submit"
					>
						{loading ? (
							"Loading..."
						) : (
							<>
								Login <FaLongArrowAltRight />
							</>
						)}
					</FormBtn>
					<p className="text-center pt-2">No account yet?
						<button onClick={() => setAuthMode("register")} className="pl-2 ">
							<Link to="/register" className="text-blue-500 underline">
								Register here
							</Link>
						</button>
					</p>

				</div>}


				{/* Register */}
				{authMode === "register" && <div>
					<FormBtn
						className="flex items-center gap-2 justify-center"
						type="submit"

					>
						{loading ? (
							"Registering..."
						) : (
							<>
								Register <FaLongArrowAltRight />
							</>
						)}
					</FormBtn>
					<p className="text-center pt-2">Got an account already?
						<button className="pl-2"
							onClick={() => setAuthMode("login")}>
							<Link to="/" className="text-blue-500 underline">
								Login here
							</Link>
						</button>
					</p>

				</div>}
			</form >
		</div >
	);
};

export default LoginForm;
