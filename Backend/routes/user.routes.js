const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller")
const z = require("zod");

//Creating schema for Name, email and password
const userSchema = z.object({
    name : z.string().min(1),
    email : z.string().email().min(4),
    password : z.string().min(6),
})
// Middleware functioin for validating user
const validateUser = (req,res,next)=>{
    const validating = userSchema.safeParse({
        name: req.body.fullName?.firstName, 
        email: req.body.email, 
        password: req.body.password
    })
    if(!validating.success){
        res.status(400).json({message:validating.error.errors})
    }
    next();
}

router.post("/register", validateUser,userController.registerUser)


module.exports = router