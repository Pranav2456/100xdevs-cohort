const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const existingAdmin = await Admin.findOne({username: username, password: password});
    if(existingAdmin) {
        res.status(400).json({message : "Admin already exists"});
        return;
    } else {
        const admin = new Admin({username, password});
        await admin.save();
        res.status(200).json({message: "admim created successfully"});
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.findOne({username});
    if(!admin) {
        res.status(400).json({message : "Admin does not exist"});
    } else {
        const token = jwt.sign({username}, jwtPassword);
        res.status(200).json({token});
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const course = new Course({title, description, price, imageLink});
    await course.save();

    const admin = await Admin.findOne({username: req.headers["username"]});
    admin.purchasedCourses.push(course._id);
    await admin.save();
    res.status(200).json({message: "course created successfully", courseId: course._id});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const {username} = req.headers;
    const admin = await Admin.findOne({username: username, password: password});
    const courses = admin.purchasedCourses;;
    res.status(200).json({courses});
});

module.exports = router;