import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import { ContactProvider } from "./context/contactContext.jsx";
import ContactProfile from "./pages/ContactProfile.jsx";
import LoginIn from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./components/ui/MainLayout.jsx";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<ContactProvider>
					<div className="app-container">
						<MainLayout>
							<Routes>
								<Route path="/" element={<LoginIn />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/profile" element={<ContactProfile />} />
								<Route path="/register" element={<LoginIn />} />
							</Routes>
						</MainLayout>
					</div>
				</ContactProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
