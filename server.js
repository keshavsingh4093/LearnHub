import { courseRouter } from "./routes/course.router.js";
import { connectToDatabase } from "./dbConnection.js";
import { userRouter } from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("Healthy");
});

app.use("/user", userRouter);

app.use("/course", courseRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server started at http://localhost:${PORT}`);
});
