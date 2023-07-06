const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({//user = admin , employees
    feedback:{
        type:String,
        required:true
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Employee' //mongoose will populate to Employee using this reference
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Employee'//mongoose will populate to Employee using this reference
    },
    
},{timestamps:true});

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedback;