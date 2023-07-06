const mongoose = require('mongoose');

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
    },
    role:{
        type:String,
        required:true
    },
    feedbacks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Feedback'
        }
    ],
    assignTasks:[ {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'AssignTask'
        }
    ]
},{timestamps:true});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;