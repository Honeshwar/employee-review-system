const mongoose = require('mongoose');//all gagha one instance use that first import/require

const userSchema = new mongoose.Schema({//user = admin + employees
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

const User = mongoose.model('User',userSchema);//collection name

module.exports = User;//require return an user model obj