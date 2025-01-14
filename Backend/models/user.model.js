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
            minLength:[2, "Last name must be atleast 2 characters long."]
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
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("User",userSchema)
module.exports = userModel;