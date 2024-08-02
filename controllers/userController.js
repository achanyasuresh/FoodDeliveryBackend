import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

// Login user
const userLogin = async (req, res) => {
    console.log("Request body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Debugging statements
        console.log("Password from request:", password);
        console.log("Hashed password from database:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, userId: user._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Added token expiration time
};

// User signup
const userSignUp = async (req, res) => {
    const { name, password, email } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Name, email, and password are required" });
    }

    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a stronger password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, userId: user._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

export { userLogin, userSignUp };
