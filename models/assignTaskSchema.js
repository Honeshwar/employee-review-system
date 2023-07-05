const mongoose = require('mongoose');//all gagha one instance use that first import/require

const assignTaskSchema = new mongoose.Schema({//user = admin + employees
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    reviewer:{//that do review
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    recipient:{//receiver,receive a feedback
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    
},{timestamps:true});

const AssignTask = mongoose.model('AssignTask',assignTaskSchema);//collection name

module.exports = AssignTask;//require return an assign Task model obj