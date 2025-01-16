const express = require("express")
const router = express.Router();
const z = require("zod");
const {captainRegistration} = require("../controllers/captain.controller")

const captainValidatioinSchema = z.object({
    name:z.string().min(2, "First name must be atleast 2 character long."),
    email:z.string().email().min(4, "Email must be atleast 4 character long."),
    password: z.string().min(6, "Password must contain atleast 6 character long."),
    vehicleColor: z.string().min(3,"Vehicle color must be of length 3."),
    vehiclePlate: z.string().min(3,"Vehicle plate must 3 character long."),
    vehicleCapacity: z.number().min(1,"Vehicle capacity must be greater than 1"),
    vehicleType:z.enum(["car","motorcycle","auto"],"Value should be only motorcycle || car || auto.")
})

const validateCaptain = (req,res,next)=>{
    const validating = captainValidatioinSchema.safeParse({
        name: req.body.fullName?.firstName,
        email: req.body.email,
        password: req.body.password,
        vehicleColor: req.body.vehicle.color,
        vehiclePlate:req.body.vehicle.plate,
        vehicleCapacity: req.body.vehicle.capacity,
        vehicleType: req.body.vehicle.vehicleType
    });
    
    if(!validating.success){
        return res.status(400).json({message: validating.error.errors});
    }
    
    next();
}

router.post("/register",validateCaptain,captainRegistration);

module.exports = router;