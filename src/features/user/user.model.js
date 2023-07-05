const mongoose=require("mongoose")

const EmployeeSchema=new mongoose.Schema({
    EmpID:{type:String, required:true,unique:true},
    name:{type:String, required:true},
    DOB:{type:String, required:true},
    DOJ:{type:String, required:true},
    official_email:{type:String, required:true,unique:true},
    personal_email:{type:String, required:true,unique:true},
    address:{type:String, required:true},
    contact:{type:String, required:true},
    position:{type:String, required:true},
    salary:{type:String, required:true},



    
    

},{
        versionKey:false,
        timestamps:true
    })
     const Employee=mongoose.model("employdetails",EmployeeSchema)
     module.exports=Employee