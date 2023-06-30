const mongoose = require('mongoose');//all gagha one instance use that first import/require

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;//require return an employee model obj