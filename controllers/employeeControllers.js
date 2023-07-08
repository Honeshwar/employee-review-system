const Employee = require('../models/employeeSchema');
const Feedback = require('../models/feedbackSchema')
const AssignTask = require('../models/assignTaskSchema');
const Admin = require('../models/adminSchema');

// employeeDashboard
exports.employeeDashboard = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="employee"){
            const employeeId = req.user.id;//employeeId
            //finding users and current session user and render employee dashboard page
            const employee = await Employee.findById(employeeId).populate({
                path:'feedbacks',
                options: {
                    sort: "-createdAt",
                },
                populate:{
                    path:'from to'
                    
                }
            });
            const employees = await Employee.find({});

            const adminInDb = await Admin.find({});//only one admin in db always
            let admin = {};
            if(adminInDb.length !== 0){
                admin = adminInDb[0];
            }
            
            return res.render('./employee pages/employeeDashboard.ejs',{
                title:"Employee Dashboard",
                employees,
                feedbacks:employee.feedbacks,
                admin,
                feedbackWithoutPopulate:await Feedback.find({}).sort('-createdAt'),
            });
        }
        return res.redirect('/signin');        
    } catch (error) {
        console.log("error while finding user/employee in DB",error);
        req.flash('error',"error while finding user/employee in DB!!!");
        return res.redirect('back');
    }
}

// add feedback by employee
exports.addFeedback = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="employee"){
            const data = req.body;
            const findEmployee = await Employee.findById(data.to);

            // creating new feedback
            const newFeedback = await Feedback.create({
                ...data
            });

            //pushing to user feedbacks array(feedback field)
            findEmployee.feedbacks.push(newFeedback.id);
            findEmployee.save();

            req.flash('success',' Successfully added feedback');
            return res.redirect('back');
        }
        return res.redirect('/signin');  
    } catch (error) {
        console.log('error while adding  Feedback',error);
        req.flash('error',"error while adding  Feedback!!!");
        return res.redirect('back');
    }

}
 
// get all tasks (assigned by admin) controller
exports.getTasks = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="employee"){
            //populating over all assignTasks and render employee task page
            const findEmployee = await Employee.findById(req.user.id).populate({
                path:'assignTasks',
                options: {
                    sort: "-createdAt",
                },
                populate:{
                    path:'reviewer recipient'
                }
            });
            return res.render('./employee pages/employeeTasks.ejs',{
                title:"Tasks",
                assignTasks:findEmployee.assignTasks,
                admin:(await Admin.find({}))[0],
            });
        }
        return res.redirect('/signin');  
    } catch (error) {
        console.log('error while finding tasks in DB',error);
        req.flash('error',"error while finding tasks in DB!!!");
        return res.redirect('back');
    }

}

//complete assign task employee
exports.completeAssignTask = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="employee"){
            // add feedback 
            const data = req.body;// data={feedback:,from,to}
            const recipientId = data.to;//receiver,receive a feedback
            const reviewerId = data.from;

            //create new feedback
            const newFeedback = await Feedback.create({
                ...data
            });
            
            //finding user(recipient/receiver) that belong to this created feedback and add new feedback to its feedbacks array(to:,recipient)
            const findRecipient = await Employee.findById(recipientId).populate('assignTasks');
            findRecipient.feedbacks.push(newFeedback.id);
            findRecipient.save();
            
            // find and delete complete task 
            await AssignTask.findByIdAndDelete(data.taskId);
            const findReviewer = await Employee.findById(req.user.id).populate('assignTasks');
            const updatedAssignTaskArray = findReviewer.assignTasks.filter((task)=>task.id !== data.taskId);
            findReviewer.assignTasks = updatedAssignTaskArray;
            findReviewer.save();//save in db
        
            req.flash('success',' Successfully completed assigned task ');
            return res.redirect('back');
        }
        return res.redirect('/signin'); 
    } catch (error) {
        console.log('error while completeAssignTask controller ',error);
        req.flash('error',"error while complete Assign Task !!");
        return res.redirect('back');
    }

}


// redirect to sign will further redirect req to it destination depend upon session, role of user [logic]