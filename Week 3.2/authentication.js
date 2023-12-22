const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoUri = "mongodb+srv://pranavvinodan:lQc1F7qZA8TVvXeg@cluster0.2kuj13n.mongodb.net/"

async function Mongodbconn() {
  try {
  // Connect to the MongoDB cluster
  await mongoose.connect(mongoUri);
  console.log("Mongoose is connected");
} catch (e) {
  console.log("Could not connect to MongoDB:", e.message);
}
}
Mongodbconn();

// CRUD - Create, Read, Update, Delete. CRUD Operations are performed on a database.

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
  try {
    const data = await User.findOne({username: username});
    return !!data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

app.post("/signup", async (req,res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  const userDetails = new User({
    name : name,
    username : username,
    password : password
  });

  await userDetails.save();
  return res.json({
    msg : "User created successfully"
  });
})

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!(await userExists(username, password))) {
    return res.status(403).json({
      msg: "User doesnt exist in our db",
    });
  }

  var token = jwt.sign({ username: username }, "shhhhh");
  return res.json({
    token,
  });
});

app.get("/users", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    const data = await User.find({username : { $ne : username}});
    const users = data.filter((user) => {
      if(user.username === username ) {
        return false;
      } else {
        return true;
      }
    })

    return res.json({users});
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);