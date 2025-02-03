import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: "Server error" });
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = token_decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

export default authUser;