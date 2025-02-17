import { sendOtp, verifyOtp, signUpUser, loginUser, forgotPassword, resetPassword, verifyResetOtp } from "../controllers/user controller/auth.controller.js";
import { addToWishlist, showWishlist } from "../controllers/user controller/wishlist.controller.js";
import { addToCart, showCartItems } from "../controllers/user controller/cart.controller.js";
import { authenticationCheck } from "../middlewares/user.middleware.js";
import { Router } from "express";

const userRouter = Router();

// send otp for verifying email on Signup, payload required(email)
userRouter.post("/send-otp", sendOtp);

// verify otp for verifying email on Signup, payload required(email, code(otp))
userRouter.post("/verify-otp", verifyOtp);

// signup route after verifying email, payload required(email, name, password)
userRouter.post("/signup", signUpUser);

// login route once signup is completed, payload required(email, password)
userRouter.post("/login", loginUser);

// forgot password route if user forgot his password, payload required(email(registered))
userRouter.post("/forgot-password", forgotPassword);

// for verifying opt send for forgot password, payload required(OTP);
userRouter.post("/verify-resetotp", verifyResetOtp);

// for reseting the new password after email verification, payload required(newpassword) 
userRouter.post("/reset-password", resetPassword);

// Authentication check before accessing private routes
userRouter.use(authenticationCheck);

// for adding the course in cart, payload required(courseId)
userRouter.post("/cart", addToCart);

// for getting all the courses which are already present in cart
userRouter.get("/cart", showCartItems);

// for adding a course in wishList, payload required(courseId)
userRouter.post("/wishlist", addToWishlist);

// for getting all the courses which are already present in wishList
userRouter.get("/wishlist", showWishlist);

export { userRouter };