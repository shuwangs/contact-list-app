import { Router } from "express";
import * as userService from "../services/userService.js";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const result = await userService.getAllUsers();
		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: error.message || "Internal Server Failure",
		});
	}
});

export default router;
