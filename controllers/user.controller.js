import { generateAccessToken, generateRefreshToken, generateResetToken, verifyToken } from "../utils/jwt.utils.js";
import { transporter } from "../utils/mail.utils.js";
import { User } from "../models/user.model.js";
import argon2 from "argon2";
import "dotenv/config";

const generateOtp = () => Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

const otpStore = {};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const OTP = generateOtp();

        await transporter.sendMail({
            to: email,
            from: "learnhub@gmail.com",
            subject: "OTP Verification for LearnHub",
            html: `<p>OTP for Sign up on LearnHub</p>
                <h2>${OTP}</h2>`,
        });

        otpStore[email] = OTP;

        res.status(200).json({ success:true, message: "OTP has been send successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success:false, message: "Something went wrong while sending otp for signup" });
    }
};


const verifyOtp = (req, res) => {
    const { email, code } = req.body;

    if (otpStore[email] && otpStore[email] === Number(code)) {
        delete otpStore[email];
        return res
            .status(200)
            .json({ verified: true, message: "OTP verified successfully" });
    }

    res.status(400).json({ verified: false, message: "Invalid or expired OTP" });
};


const signUpUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("user already exist with this email");
            return res.status(400).json({ success:false, message: "user had signed up already" });
        }

        const hashPassword = await argon2.hash(password);

        const user = new User({ name, email, password: hashPassword });

        await user.save();

        res.status(201).json({ success:true, message: "Signup successful"});
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ success:false, message: "Signup failed" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
      
        const user = await User.findOne({ email });

        if (!user) {
            console.log("user is not present in database with this email");
            return res.status(400).json({ success:false, message: "Incorrect email or password" });
        }

        const isValidUser = await argon2.verify(user.password, password);
    
        if (!isValidUser) {
            console.log("Incorrect password");
            return res
                .status(400)
                .json({ success: false, message: "Incorrect email or password" });
        }

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success:true, message: "login successful" });
  } catch (error) {
        console.log(error.message);
        res.status(401).json({ success: false, message: "Login failed" });
  }
};


const resetOTP = {};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            console.log("user is not present in database with this email");
            return res.status(400).json({ message: "user not exist for this email" });
        }

        const OTP = generateOtp();

        resetOTP[email] = OTP;

        await transporter.sendMail({
            to: email,
            from: "learnhub@gmail.com",
            subject: "Forgot Password OTP for LearnHub",
            html: `<p>OTP for Forgot Password on LearnHub</p>
                <P>This OTP is valid for 10 minutes.</p>
                <h2>${OTP}</h2>`,
        });

        const resetToken = generateResetToken(user);

        res.cookie("resetToken", resetToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 10 * 60 * 1000,
        });

        res.status(200).json({ message: "OTP has been send successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};


const verifyResetOtp = async (req, res) => {
    try {
        const { OTP } = req.body;

        const resetToken = res.cookies.resetToken;

        if (!resetToken) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        const decode = verifyToken(resetToken, process.env.JWT_RESET_PASS);

        if (!decode) {
            return res.status(400).json({ success: false, message: "Invalid Request" });
        }

        if (resetOTP[decode.email] && resetOTP[decode.email] === Number(OTP)) {
            delete resetOTP[decode.email];
            res.status(200).json({ message: true, message: "OTP verified" });
        } else {
            res.status(400).json({ success: false, message: "Incorrect OTP" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}


const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;

        const resetToken = res.cookies.resetToken;

        if (!resetToken) {
            return res
                .status(400)
                .json({ success: false, message: "timeout for reset password" });
        }

        const decode = verifyToken(resetToken, process.env.JWT_RESET_PASS);

        if (!decode) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Request" });
        }


        const user = await User.findOne({ _id: decode.id });

        const hashPassword = await argon2.hash(password);

        user.password = hashPassword;

        await user.save();

        res.status(200).json({ success:true, message: "Password updated successfully" });
    } catch (error) {
        console.log("Invalid reset token");
        res.status(400).json({ success:false, message: "Something went wrong" });
    }
};


export { sendOtp, verifyOtp, signUpUser, loginUser, forgotPassword, verifyResetOtp, resetPassword };
