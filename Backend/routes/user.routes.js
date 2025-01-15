const express = require("express")
const router = express.Router();
const {registerUser, loginUser, getUserProfile, getLogoutProfile} = require("../controllers/user.controller")
const authUser = require("../middleware/auth.middleware")
const z = require("zod");
//Creating schema for Name, email and password
const userSchema = z.object({
    name : z.string().min(1),
    email : z.string().email().min(4),
    password : z.string().min(6),
})
const loginSchema = userSchema.pick({
    email:true,
    password:true,
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
//Middleware for validating loggedin user
const loginMiddleware = (req,res,next)=>{
    const validating = loginSchema.safeParse({
        email: req.body.email, 
        password: req.body.password
    })
    if(!validating.success){
        res.status(400).json({message:validating.error.errors})
    }
    next();
}

router.post("/register", validateUser,registerUser);
router.post("/login", loginMiddleware, loginUser);
router.get("/profile",authUser,getUserProfile);
router.get("/logout",authUser, getLogoutProfile)

module.exports = router