const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const token = req.headers.authorization;
        const words = token.split("");
        const jwtToken = words[1];
        const decoded = jwt.verify(jwtToken, jwtPassword);
        if(decoded.username) {
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