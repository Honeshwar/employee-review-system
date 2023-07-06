const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    // feedbacks:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         required:true,
    //         ref:'Feedback'
    //     }
    // ],
 
},{timestamps:true});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;