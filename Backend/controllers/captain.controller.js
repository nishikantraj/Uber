const jwt = require("jsonwebtoken")
const captainModel = require("../models/captain.model");
const hashPassword = require("../utility/hashPassword")
const comparePassword = require("../utility/comparePassword")
const BlacklistToken = require("../models/blacklistToken.model")


const captainRegistration = async(req,res)=>{
    try {
        const {fullName, email, password, vehicle} = req.body;
        
        const isExist = await captainModel.findOne({email});
        if(isExist)
            return res.status(400).json({message:"Captaion already exists."});

        const hashedPassword = await hashPassword(password);
        
        // create new captaion
        const captain = new captainModel({
            fullName:{
                firstName: fullName.firstName,
                lastName: fullName.lastName
            },
            email: email,
            password: hashedPassword,
            vehicle:{
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });
        captain.save();
        //Generate auth token using captainSchema.
        const token = captain.generateAuthToken();
        res.status(200).json({captain,token})

    } catch (error) {
        res.status(500).json({message: "server error",error:error.message})
    }
}

const captainLogin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const captain = await captainModel.findOne({email}).select("+password");
        if(!captain)
            return res.status(400).status({message:"Invalid email or password"});
        
        const isMatch = await comparePassword(password,captain.password);
        if(!isMatch)
            return res.status(401).json({message:"Invalid email or password"})

        //Generate captain token
        const token = jwt.sign({_id:captain._id}, process.env.JWT_SECRET, {expiresIn:"24h"});
        // store token in cookie
        res.cookie("token", token);

        res.status(200).json({captain,token});

    } catch (error) {
        return res.status(500).json({message:"Server error: ",error});
    }
}
const getCaptainProfile = async(req,res)=>{
    res.json(req.captain);
}
const captainLogout = async(req,res)=>{
    res.clearCookie("token");
    // get token and blacklist this token
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const blacklistToken = new BlacklistToken({
        token:token
    });
    blacklistToken.save();
    res.status(200).json({message:"Logged out successfully."})
}

module.exports = {captainRegistration, getCaptainProfile, captainLogin, captainLogout}