const mongoose = require("mongoose")

const captainSchema = new mongoose.Schema({
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
    },
    status:{
        type:String,
        enum:["active", "inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3, "Color must be atleast 3 characters long."]
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,"Number plate must be 3 characters long."]
        },
        capacity:{
            type:String,
            required:true,
            min:[1, "Capacity must be atleast 1."]
        },
        vehicleType:{
            type:String,
            enum:["car","motorcycle","auto"],
            required:true
        }
    }
})