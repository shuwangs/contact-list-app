import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import { ContactProvider } from "./context/contactContext.jsx";
import LoginIn from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<ContactProvider>
					<div className="app-container">
						<Routes>
							<Route path="/" element={<LoginIn />} />
							<Route path="/dashboard" element={<Dashboard />} />
						</Routes>
					</div>
				</ContactProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
