const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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

module.exports = userMiddleware;