import cors from "cors";
import express from "express";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/continue", authRoute);
app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);

export default app;
