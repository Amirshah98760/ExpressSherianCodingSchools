const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        // Create & save user

        const existingUser = await userModel.findOne({ email});
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }
        const user = await userModel.create({
            username,
            email,
            password,
        });

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        user.password = undefined;

        res.cookie("token", token);

        res.status(201).json({
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
};
