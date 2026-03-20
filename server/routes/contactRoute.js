import { Router } from "express";
import * as contactService from "../services/contactService.js";

const router = Router();

router.get("/users/:userId", async (req, res) => {
    const userId = Number(req.params.userId);
    console.log("In contactRoute, userId is: ", userId)
    if (isNaN(userId)) {
        return res.status(400).json({
        status: "fail",
        message: "Invalid userId",
        });
    }

    try {
        const result = await contactService.getContactsByUserId(userId);
        console.log("In contactRoute, getContactsByUserId result: ", result);
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
