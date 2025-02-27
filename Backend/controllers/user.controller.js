const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model")

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const isExist = await userModel.findOne({email})
        if(isExist)
            return res.status(400).json({message: "User already exist."})

        // Password hashing before saving to database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save a new user
        const user = new userModel({
            fullName:{
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword,
        });
        user.save()
        // Create user token from the instance (not the model)
        const token = user.generateAuthToken();  // Call on the 'user' instance
        res.status(201).json({ user,token});

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
};

const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    
    try {
        const user = await userModel.findOne({email}).select("+password");    
        
        if(!user)
            return res.status(401).json({message:"Invalid email or password"})
        
        //Match the password
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch)
            return res.status(401).json({message:"Invalid email or password"})
        
        // Generate user token
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn: '24h'})
        res.cookie("token", token)
        res.status(200).json({user,token})

    } catch (error) {
        res.status(500).json({message:"Servor error: ",error: error.message})
    }
}

const getUserProfile = async (req,res)=>{
    res.status(200).json(req.user);
}

const getLogoutProfile = async(req,res)=>{
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // await BlacklistToken.create({token:token});
    const blacklistToken = new BlacklistToken({
        token:token
    })
    blacklistToken.save()
    res.status(200).json({message:"Logged out Successfully."})
}

module.exports = {registerUser,loginUser, getUserProfile, getLogoutProfile};
