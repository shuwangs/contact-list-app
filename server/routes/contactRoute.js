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

    const { userId, firstName, lastName,  email,phoneNumber, isEmergencyContact, notes } = req.body;
    // if (!firstName ) {
    //     return res.status(400).json({
    //         status: "fail",
    //         message: "invalid request",
    //     });
    // }

    try {
        const result = await contactService.addContact( userId, firstName, lastName,  email,phoneNumber, isEmergencyContact, notes );
        console.log("Add contact result: ", result);


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

export default router;
