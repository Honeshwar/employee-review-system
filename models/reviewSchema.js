const mongoose = require('mongoose');//all gagha one instance use that first import/require

const reviewSchema = new mongoose.Schema({//user = admin + employees
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    
},{timestamps:true});

const Review = mongoose.model('Review',reviewSchema);//collection name

module.exports = Review;//require return an Review model obj