const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required: true,
            minLength:[2, "First name must be atleast 2 characters long."]
        },
        lastName:{
            type:String,
            required:false
        }
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn: '24h'})
    return token;
}

const userModel = mongoose.model("User",userSchema)
module.exports = userModel;