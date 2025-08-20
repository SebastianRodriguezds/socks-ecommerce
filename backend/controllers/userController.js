const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto  = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail")

//reg
exports.registerUser = async (req, res)=> {
    
    try{
        const {name, email, password} = req.body;

        //already exist?
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: "User already exists"});
        
        const user = await User.create({ name, email, password});
        res.status(201).json({message: "User registered successfully", 
        user: {id: user._id, name: user.name, email : user.email}    
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

//login
exports.loginUser = async (req, res)=> {
    try{
        console.log("Request body:", req.body);
        const { email, password } = req.body;
        console.log("Login attempt for:", email);
        
        const user = await User.findOne({email});
        if (!user) return res.status(400).json ({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password.trim(), user.password);
        console.log("Que devulve isMatch? :",isMatch);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        //JWT
        const token = jwt.sign ({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.json({
            token, 
            user: {id: user._id, name: user.name, email: user.email },
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getProfile = async (req, res)=> {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user);
        }catch (err){
            res.status(500).json({message: "Server error", error: err.message});
        }
};


//reset pass
exports.ForgotPassword = async (req, res)=> {
    const {email} = req.body;

    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message : "User not found"});
    }

    //tok
    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${token}`;

    //send email to user
    try{
        await sendEmail({
            to: user.email, 
            subject: "Password Reset Request",
            text: `Click this link to reset your password: ${resetUrl}`,
        });
        res.status(200).json({message: "Email sent"});
    }catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).json({message: "Email could not be sent"});
    }
};

