const mongoose = require("mongoose")

const conncetDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected...");
    } catch (error) {
        console.log("Error while connceting DB: "+ error);
        process.exit(1);
    }
}

module.exports = conncetDB