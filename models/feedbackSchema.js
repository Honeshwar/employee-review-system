const mongoose = require('mongoose');//all gagha one instance use that first import/require

const feedbackSchema = new mongoose.Schema({//user = admin + employees
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    feedback:{
        type:String,
        required:true
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'//i will populate to user using it
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'//i will populate to user using it
    },
    
},{timestamps:true});

const Feedback = mongoose.model('Feedback',feedbackSchema);//collection name

module.exports = Feedback;//require return an Feedback model obj