import cors from "cors";
import express from "express";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";
import authenticateToken from "./middleware/authMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", authenticateToken, userRoute);
app.use("/api/contacts", authenticateToken, contactRoute);

export default app;
