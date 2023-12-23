const {Admin} = require("../db/index");
const {bcrypt} = require("bcrypt");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const username = req.haeders["username"];
        const password = req.headers["password"];

    const admin = await Admin.findOne({username});

    if(!admin) {
        res.status(401).json({message: "Unauthorized"})
    } else {
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if(passwordMatch) {
            next();
        }  else {
            res.status(401).json({message: "Unauthorized"});
        }
    }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = adminMiddleware;