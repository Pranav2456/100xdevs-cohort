const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://pranavvinodan:lQc1F7qZA8TVvXeg@cluster0.2kuj13n.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    }]

});

const UserSchema = new mongoose.Schema({
    username : String,
    password: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}