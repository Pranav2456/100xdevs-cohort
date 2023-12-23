const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const existingAdmin = await Admin.findOne({username});
    if(existingAdmin) {
        res.status(400).json({message : "Admin already exists"});
        return;
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({username, password: hashedPassword});
        await admin.save();
        res.status(200).json({message: "admim created successfully"});
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const admin = await Admin.findOne({username});
    if(!admin) {
        res.status(400).json({message : "Admin does not exist"});
    } else {
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if(passwordMatch) {
            const token = jwt.sign({username}, jwtPassword);
            res.status(200).json({token});
        } else {
            res.status(401).json({message: "Unauthorized"});
        }
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body;
    const course = new Course({title, description, price, imageLink});
    await course.save();

    const admin = await Admin.findOne({username: req.headers["username"]});
    admin.courses.push(course._id);
    await admin.save();
    res.status(200).json({message: "course created successfully", courseId: course._id});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const {username} = req.headers;
    const admin = await Admin.findOne({username});
    const courses = admin.courses;
    res.status(200).json({courses});
});

module.exports = router;