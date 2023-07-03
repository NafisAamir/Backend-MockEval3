const { Router}=require("express")
require("dotenv").config()

const {EmployeeModel}=require("../models/Employee.model")

const employeesController=Router();

employeesController.get("/",async(req,res)=>{
    const employees=await EmployeeModel.find({userId:req.body.userId});
    res.send(employees)
})

employeesController.post("/create",async(req,res)=>{
    const {First_Name,Last_Name,Email,Department,Salary,userId}=req.body
    const employee=new EmployeeModel({
        First_Name,
        Last_Name,
        Email,
        Department,
        Salary,
        userId
    })
    try {
        await employee.save();
        res.send("Employee created");
    } catch (error) {
        res.send("Something went wrong");
    }
})

employeesController.delete("/delete/:employeeId",async(req,res)=>{
    const {employeeId}=req.params

    const deletedemployee=await EmployeeModel.findOneAndDelete({_id:employeeId,userId:req.body.userId})
    if(deletedemployee){
        res.send("Deleted");
    }else{
        res.send("Could not Delete")
    }
})

employeesController.patch("/edit/:employeeId",async(req,res)=>{
    const {employeeId}=req.params
    const editedemployee=await EmployeeModel.findOneAndUpdate({_id:employeeId,userId:req.body.userId},{...req.body})
    if(editedemployee){
        res.send("Employee Edited")
    }
    else {
        res.send("Could not edit");
    }
})

module.exports={
    employeesController
}