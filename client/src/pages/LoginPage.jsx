import React from "react";
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {

	return (
		<div className="flex border border-teal flex-col min-h-screen pt-30">
			<div className="mx-auto w-full max-w-md rounded-2xl  border border-3 border-[#0081a7] p-8 shadow-2xl">
				<h1 className="mb-2 text-center text-2xl font-bold text-[#0081a7]">
					Welcome
				</h1>

				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
