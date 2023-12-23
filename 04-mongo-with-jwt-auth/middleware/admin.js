// Middleware for handling auth
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, jwtPassword);
        if(decoded.username === req.headers.username) {
            next();
        } else {
            res.status(401).json({message: "Unauthorized"});
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = adminMiddleware;