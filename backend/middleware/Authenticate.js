import jwt from "jsonwebtoken"
import {User} from "../Model/Model.js";

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            return res.status(401).json({ error: "Token is missing" });
        }
        
        const verrifyToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!verrifyToken) {
            return res.status(401).json({ error: "Token is invalid" });
        }

        const rootUser = await User.findOne({ _id: verrifyToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.rootUserId = rootUser._id;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
        console.error(err);
    }
}

export default Authenticate;
