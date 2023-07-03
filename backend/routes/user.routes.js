const jwt=require("jsonwebtoken")
const {Router}=require('express')
const {UserModel}=require("../models/User.model")
const bcrypt=require("bcrypt")
require("dotenv").config()

const userController=Router()

userController.post("/signup",(req,res)=>{
    const {email,password,confirm_password}=req.body;
    if(password===confirm_password){
        bcrypt.hash(confirm_password,5,async function(err,hash){
            if(err){
                res.send("Something went wrong, Please try again later")
            }
            const user=new UserModel({
                email,
                password:hash,
                confirm_password:hash

            })
            await user.save()
            res.json({message:"Signup Successfull"})
        })
    }else {
        res.send("Something went wrong, Please try again later");
    }
})

userController.post("/login",async(req,res)=>{
            const {email,password}=req.body;
            const user=await UserModel.findOne({email})
            const hash=user.password
            bcrypt.compare(password,hash,function(err,result){
                if(err){
                    res.send("Something went wrong Please try again later")
                }
                if(result){
                    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
                    res.json({message:"Login successfull",token})
                }
                else {
                    res.send("Invalid credentials")
                }
            })
})

module.exports={
    userController
}