import { Router } from "express";
import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";

const router = Router();

router.post("/register", async (req, res) => {
	console.log("In authRoute...");
	console.log("register body is: ", req.body);

	const { name, email } = req.body;
	if (!name || !email) {
		return res.status(400).json({
			status: "fail",
			message: "Name and email are required",
		});
	}

	try {
		const newUser = await authService.registerUser(name, email);
		console.log("In register, result after authService..", newUser);
		// Create JWT tokens
		const token = jwt.sign(
			{
				id: newUser.id,
				email: newUser.email,
				name: newUser.name,
			},
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
		);
		console.log("tokens are: ", token);
		res.status(201).json({
			status: "success",
			data: {
				newUser,
				token,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
	console.log("user trying to login: ", req.body);
	const { name, email } = req.body;

	if (!email) {
		return res.status(400).json({
			status: "fail",
			message: "Email is required",
		});
	}

	try {
		const user = await authService.loginUser(email.trim());
		console.log(user);

		// Create JWT tokens
		const token = jwt.sign(user, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || "1h",
		});

		res.status(200).json({
			status: "Login successful",
			data: {
				user,
				token,
			},
		});
	} catch (error) {
		res.status(401).json({
			status: "fail",
			message: "Invalid credentials",
		});
	}
});
export default router;
