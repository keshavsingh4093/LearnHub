import { sendOtp, verifyOtp, signUpUser, loginUser, forgotPassword, verifyResetOtp, resetPassword } from "../controllers/user.controller.js";
import { authenticationCheck } from "../middlewares/user.middleware.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/send-otp", sendOtp);

userRouter.post("/verify-otp", verifyOtp);

userRouter.post("/signup", signUpUser);

userRouter.post("/login", loginUser);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/verify-resetotp", verifyResetOtp);

userRouter.post("/reset-password", resetPassword);

userRouter.use(authenticationCheck);


export { userRouter };