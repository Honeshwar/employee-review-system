const mongoose = require('mongoose');

const assignTaskSchema = new mongoose.Schema({
    reviewer:{//that do review
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Employee'
    },
    recipient:{//receiver,receive a feedback
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Employee'
    },
    
},{timestamps:true});

const AssignTask = mongoose.model('AssignTask',assignTaskSchema);

module.exports = AssignTask;