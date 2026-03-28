import { Router } from "express";
import * as contactService from "../services/contactService.js";

const router = Router();

router.get("/users/:userId", async (req, res) => {
	const userId = Number(req.params.userId);
	if (isNaN(userId)) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid userId",
		});
	}

	try {
		const result = await contactService.getContactsByUserId(userId);
		console.log("result in the contact service is: ", result);
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

router.post("/", async (req, res) => {
	console.log("In contactRoute...");
	console.log("Request body is: ", req.body);

	const {
		userId,
		firstName,
		lastName,
		email,
		phoneNumber,
		isEmergencyContact,
		notes,
		tag,
	} = req.body;
	if (!firstName) {
		return res.status(400).json({
			status: "fail",
			message: "invalid request",
		});
	}

	try {
		const result = await contactService.addContact(
			userId,
			firstName,
			lastName,
			email,
			phoneNumber,
			isEmergencyContact,
			notes,
			tag,
		);
		console.log("In contactRoute, after add contact, the result is: ", result);
		res.status(201).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Internal Server Error",
		});
	}
});

router.put("/:contactId", async (req, res) => {
	const id = Number(req.params.contactId);

	console.log("PUT Request body contact id is : ", id);
	console.log("PUT Request body is: ", req.body);
	if (isNaN(id)) {
		return res.status(400).json({
			status: "fail",
			message: "invalid request",
		});
	}
	const {
		userId,
		firstName,
		lastName,
		email,
		phoneNumber,
		isEmergencyContact,
		notes,
		tag,
	} = req.body;

	try {
		const result = await contactService.updateContact(
			id,
			firstName,
			lastName,
			email,
			phoneNumber,
			isEmergencyContact,
			notes,
			tag,
		);
		console.log(
			"In contactRoute, after update contact, the result is: ",
			result,
		);
		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Internal Server Error",
		});
	}
});

router.delete("/:contactId", async (req, res) => {
	console.log("In contactRoute... ");
	console.log("In contactRoute... ");

	const contactId = Number(req.params.contactId);
	if (isNaN(contactId)) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid contactId",
		});
	}

	try {
		const result = await contactService.deleteContact(contactId);
		if (!result) {
			return res.status(404).json({
				status: "fail",
				message: "User not Found in database",
			});
		}

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

router.get("/:userId/search", async (req, res) => {
	console.log("Searching in contactRoute..");
	try {
		const userId = Number(req.params.userId);
		const { keyword } = req.query;
		if (!Number.isInteger(userId) || userId <= 0) {
			return res.status(400).json({ error: "Invalid userId" });
		}

		if (!keyword || !keyword.trim()) {
			return res.status(400).json({ error: "Search keyword is required" });
		}

		const result = await contactService.searchContactsByUserId(userId, keyword);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
