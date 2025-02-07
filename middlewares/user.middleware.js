import { generateAccessToken, verifyToken } from "../utils/jwt.utils.js";
import { User } from "../models/user.model.js";
import "dotenv/config";

const authenticationCheck = async (req, res, next) => {
    console.log("Enterd in tokenVarification.");

    const accessToken = req.cookies.accessToken;

    if (accessToken) {
        try {
            console.log("In the If Part");
            const decode = verifyToken(accessToken, process.env.JWT_ACCESS_PASS);

            if (!decode) {
                return res.status(401).json({ success: false, message: "Unauthorized Access" });
            }
 
            const user = await User.findOne({ _id: decode.id });

            req.user = user;

            next();
        } catch (error) {
            console.log("invalid access token");
            res.status(401).json({ message: "Unauthorized Access" });
        }
    } else {
        try {
            console.log("In the else Part");

            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                console.log("Neither Access nor Refresh token is present");
                return res.status(401).json({ success:false, message: "Unauthorized Access" });
            }

            const decode = verifyToken(refreshToken, process.env.JWT_REFRESH_PASS);

            if (!decode) {
                console.log("Invalid refresh token");
                return res.status(401).json({ success: false, message: "Unauthorized Access" });
            }

            const user = await User.findOne({ _id: decode.id });

            const newAccessToken = generateAccessToken(user);

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });

            req.user = user;

            next();
        } catch (error) {
            console.log("invalid refresh token");
            res.status(401).json({ message: "Unauthorized Access" });
        }
    }
};


export { authenticationCheck };
