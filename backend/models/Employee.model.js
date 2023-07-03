const mongoose=require("mongoose")

const employeeSchema=mongoose.Schema({
    First_Name:{type:String,required:true},
    Last_Name:{type:String,required:true},
    Email:{type:String,required:true},
    Department:{type:String,required:true},
    Salary:{type:String,required:true},
    userId:{type:String,required:true}
})

const EmployeeModel=mongoose.model("employee",employeeSchema)

module.exports={
    EmployeeModel
}