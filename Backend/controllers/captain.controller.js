const captainModel = require("../models/captain.model");
const hashPassword = require("../utility/hashPassword")

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

module.exports = {captainRegistration}