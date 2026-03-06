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

const loginUser = async (req, res) => {
    // Implement login logic here

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            if (user.password !== password) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            user.password = undefined;

            res.cookie("token", token);
            res.status(200).json({
                message: "User logged in successfully",
                user,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }

}


module.exports = {
    registerUser,
    loginUser
};
