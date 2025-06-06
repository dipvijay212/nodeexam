const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendLoginEmail } = require("../utils/mailer");

const registerUser = async (req, res) => {
  const { name, email, pass, city, age } = req.body;

  try {
  
    if (!name || !email || !pass) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    
    const hashedPass = await bcrypt.hash(pass, 5);
    const newUser = new User({ name, email, pass: hashedPass, city, age });
    await newUser.save();

    res.status(200).json({ msg: "The new user has been registered", registeredUser: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, pass } = req.body;

  try {
    if (!email || !pass) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7m",
    });

   
    await sendLoginEmail(user.email, user.name);

   
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 60 * 1000, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict"
    });

    res.status(200).json({ msg: "Login successful!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const logoutUser=  (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }



module.exports = { registerUser ,loginUser ,logoutUser};
