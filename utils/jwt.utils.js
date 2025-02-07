import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (user)=>{
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_ACCESS_PASS,
        { expiresIn: "1h" }
    );

    return accessToken;
}


const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_REFRESH_PASS,
        { expiresIn: "7d" }
    );

    return refreshToken;
}


const generateResetToken = (user) => {
    const resetToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_RESET_PASS,
        { expiresIn: "10m" }
    );

    return resetToken;
}


const verifyToken = (token, key) => {
    return jwt.verify(token, key);
}


export { generateAccessToken, generateRefreshToken, generateResetToken, verifyToken };