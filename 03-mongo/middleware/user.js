const { User } = require("../db/index");
const {bcrypt} = require("bcrypt");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const username = req.haeders["username"];
        const password = req.headers["password"];

    const user = await User.findOne({username});

    if(!user) {
        res.status(401).json({message: "Unauthorized"})
    } else {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch) {
            next();
        } else {
            res.status(401).json({message: "Unauthorized"});
        }
    };
   
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = userMiddleware;