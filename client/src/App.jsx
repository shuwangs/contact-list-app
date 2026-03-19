import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import LoginIn from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<div className='app-container'>
					<Routes>
						<Route path='/' element={<LoginIn />} />
						<Route path='/dashboard' element={<Dashboard />} />
					</Routes>

				</div>

			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
