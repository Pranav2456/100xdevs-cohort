const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User} = require("../db/index");
const {Course} = require("../db/index");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;
    const existingUser = await User.findOne({username});
    if(existingUser) {
        res.status(400).json({message : "User already exists"});
        return;
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashedPassword});
        await user.save();
        res.status(200).json({message: "user created successfully"});
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.status(200).json({courses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const {courseId} = req.params;
    const course = await Course.findById(courseId);
    const user = await User.findOne({username: req.headers["username"]});
    if(user.courses.includes(course._id)) {
        res.status(400).json({message: "Course already purchased"});
        return;
    } else {
        user.courses.push(course._id);
        await user.save();
        res.status(200).json({message: "Course purchased successfully"});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const {username} = req.headers;
    const user = await User.findOne({username});
    const courses = user.courses;
    res.status(200).json({courses});
});

module.exports = router