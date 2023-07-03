const express=require('express');
const {userController}=require("./routes/user.routes")
const {employeesController}=require("./routes/employees.routes")
const {connection}=require("./config/db");
const { authentication } = require('./middlewares/authentication');
const cors=require("cors");
const app=express()
require("dotenv").config()

// const PORT=8080
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page");
})
app.use(cors())
app.use("/user",userController);
app.use(authentication);
app.use("/employees",employeesController);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`Listening on Port ${process.env.PORT}`)
    } catch (error) {
        console.log("Error conecting to Database")
        console.log(error)
    }
});
