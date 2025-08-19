const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("react");

//reg
exports.registerUser = async (req, res)=> {
    try{
        const {name, email, password} = req.body;
        
        //already exist?
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: "User already exists"});

        const hashedPassword= await bcrypt.hash(password, 10);
        
        const user = await User.create({ name, email, password: hashedPassword});
        res.status(201).json({message: "User registered successfully", 
        user: {id: user._id, name: user.name, email:user.email}    
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

//login
exports.loginUser = async (req, res)=> {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json ({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
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


