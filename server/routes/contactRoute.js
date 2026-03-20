import { Router } from "express";
import * as contactService from "../services/userService.js";

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

export default router;
