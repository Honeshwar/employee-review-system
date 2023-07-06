const Employee = require('../models/employeeSchema')
const Feedback = require("../models/feedbackSchema");
const Admin = require("../models/adminSchema");

//viewAllFeedback
exports.viewAllFeedback = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="admin"){
            const employees = await Employee.find({});
            //finding all feedback and rendering admin feedback page
            let feedbacks = await Feedback.find({}).sort('-createdAt').populate('from to');//from to are property where we populate by id
            return res.render('./admin pages/adminFeedback.ejs',{
                title:'Feedback Page',
                employees,feedbacks,
                feedbackWithoutPopulate:await Feedback.find({}).sort('-createdAt'),
                admin:(await Admin.find({}))[0]
            });
        }
       return res.redirect('/signin');
    } catch (error) {
    console.log('error while getting all Feedbacks',error);
    return res.redirect('back');
}
}

//addFeedback
exports.addFeedback = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="admin"){
            const data = req.body;
            
            //create new feedback
            const newFeedback = await Feedback.create({
                ...data
            });

            const findEmployee = await Employee.findById(data.to);
            findEmployee.feedbacks.push(newFeedback.id);
            findEmployee.save();

            req.flash('success',' Successfully added feedback ');
            return res.redirect('back');
        }
        return res.redirect('/signin');
    } catch (error) {
        console.log('error while getting all Feedbacks',error);
        return res.redirect('back');
    }
}

//updateFeedback
exports.updateFeedback = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="admin"){
            const feedbackId = req.params.feedbackId;

            //update feedback
            await Feedback.updateOne({_id:feedbackId},{feedback:req.body.feedback});

            req.flash('success',' Successfully updated feedback');
            return res.redirect('back');
        }
        return res.redirect('/signin');
    } catch (error) {
        console.log('error while getting all Feedbacks',error);
        return res.redirect('back');
    }
}