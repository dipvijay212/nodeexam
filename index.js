require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user.routes");
const connection = require("./config/db");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);


app.listen(8080,async()=>{
    try {
        await connection;
        
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
})
