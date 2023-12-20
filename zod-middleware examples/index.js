const express = require("express");
const z = require("zod");
const app = express();

app.use(express.json()); // Here, app.use is used as a global middleware function, because we are not specifying any path.


// Zod is a TypeScript-first schema declaration and validation library
// It helps define clear data validation rules for your application
const schema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(6).max(15),
    kidneyId: z.number().min(1).max(2)
})


function userMiddleware(req,res,next) {
    username = req.headers.username;
    password = req.headers.password;
    const validation = schema.safeParse({username,password});
    if(!validation.success || username !== "pranav" || password !== 1234) {
        res.status(401).json({
            msg: "Incorrect inputs",
        });
    }
    else {
        next();
    }
} //Middleware function are used to check inputs before going to the main functions. It takes 3 parameters including next which is used to go to the next function.

function kidneyMiddleware(req,res,next) {
    kidneyId = req.query.kidneyId;
    const validation = schema.safeParse({kidneyId});
    if(!validation.success || kidneyId !== 1 || kidneyId !== 2) {
        res.status(401).json ({
            msg: "Incorrect inputs"
        })
    }
    else {
        next();
    }
};

app.get("/health", userMiddleware, kidneyMiddleware, (req,res) => {
    // Whatever logic 

    res.send("Your health is good");
}); // We can pass multiple middleware functions in the same route by passing them as parameters.

app.use((error,req,res,next) => {
    res.status(500).send("An internal server error occured")
}); // Here, app.use is used as an global error handling middleware function. It is used to handle errors in the whole application. 

app.listen(3000);
