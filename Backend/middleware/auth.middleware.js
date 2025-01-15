const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const BlacklistToken = require("../models/blacklistToken.model")

const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token)
        return res.status(401).json({message:"Unauthorized"})
    const isBlacklisted = await BlacklistToken.findOne({token});
    
    if(isBlacklisted)
        return res.status(401).json({message:"Unauthorized"})
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Convert string ID to ObjectId
        const userId = new mongoose.Types.ObjectId(decoded._id);
        const user = await userModel.findOne(userId)
        
        req.user = user;

        return next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = authUser