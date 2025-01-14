const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

module.exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

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

