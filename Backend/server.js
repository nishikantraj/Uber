const http = require("http")
const app = require("./app")
const PORT = process.env.PORT || 5000
const conncetDB = require("./config/db")

//Connect DB
conncetDB()

const router = http.createServer(app)
router.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
    
})