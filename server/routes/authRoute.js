import { Router } from "express";
import * as authService from "../services/authService.js";
const router = Router();

router.post('/', async (req, res) => {
    const {name, email} = req.body;
    if(!name | !email) {
        return res.status(400).json({
            status: "fail",
            message: "invalid request"
        })
    }

    try{
        const result = await authService.findOrCreateUser(name, email);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch(error) {
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error"
        })
    }

})

export default router;