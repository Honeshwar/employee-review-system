const User = require('../models/userSchema')
const Feedback = require("../models/feedbackSchema");


//viewAllFeedback
exports.viewAllFeedback = async (req,res)=>{
    try {
        const users = await User.find({});
        // console.log('************ \n',users);
        let feedbacks = await Feedback.find({}).populate('from to');//from to are property where we populate by id
        console.log('************ \n',feedbacks);
        // Feedbacks = [];
        return res.render('adminFeedback.ejs',{layout:'../layouts/layout2.ejs',title:'Feedback Page',users,feedbacks});
    } catch (error) {
        console.log('error while getting all Feedbacks',error);
        return res.redirect('back');
    }
}

//addFeedback

exports.addFeedback = async (req,res)=>{
    try {
        const data = req.body;
        const findUser = await User.findById(data.to);

        const newFeedback = await Feedback.create({
            user:findUser.id,//user that belong to feedback
            ...data
        });
        console.log('new Feedback',newFeedback);

       
        findUser.feedbacks.push(newFeedback.id);
        findUser.save();

        return res.redirect('back');
    } catch (error) {
        console.log('error while getting all Feedbacks',error);
        return res.redirect('back');
    }
}

//updateFeedback

exports.updateFeedback = async (req,res)=>{
    try {
        const feedbackId = req.params.feedbackId;

        const updateFeedback = await Feedback.updateOne({_id:feedbackId},{feedback:req.body.feedback});
        console.log('update Feedback **************** \n',updateFeedback);
        return res.redirect('back');
    } catch (error) {
        console.log('error while getting all Feedbacks',error);
        return res.redirect('back');
    }
}