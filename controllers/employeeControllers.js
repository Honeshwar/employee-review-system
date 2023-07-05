const User = require('../models/userSchema');
const Feedback = require('../models/feedbackSchema')
const AssignTask = require('../models/assignTaskSchema');

// employeeDashboard
exports.employeeDashboard = async (req,res)=>{
    try {
        // console.log('*************** req.user',req.user);//passport add session user in request
        const userId = req.user.id;//employeeId
        const user = await User.findById(userId).populate({
            path:'feedbacks',
            options: {
                sort: "-createdAt",
              },
            populate:{//nested populate
                path:'from to'//multiple field populate separated by space
                // populate:{},
                // options: {}
            }
    });//populate over reviews field
        // console.log("find user=employee*******\n",user);
        const users = await User.find({});
        return res.render('employeeDashboard.ejs',{
            layout:'../layouts/layout2.ejs',
            title:"Employee Dashboard",
            employee:user,
            users,
            feedbacks:user.feedbacks
        });
    } catch (error) {
        console.log("error while finding user/employee",error);
        return res.redirect('back');
    }
}

// add feedback by employee
exports.addFeedback = async (req,res)=>{
    try {
        const data = req.body;
        const findUser = await User.findById(data.to);

        const newFeedback = await Feedback.create({
            user:findUser.id,// that user which belong to feedback(feedback of that person)
            ...data
        });
        console.log('new Feedback',newFeedback);

       
        findUser.feedbacks.push(newFeedback.id);
        findUser.save();

        console.log('new find user',findUser);
        return res.redirect('back');
    } catch (error) {
        console.log('error while adding  Feedback',error);
        return res.redirect('back');
    }

}
 
// get all tasks (assigned by admin) controller
exports.getTasks = async (req,res)=>{
    try {
        const findUser = await User.findById(req.user.id).populate({
            path:'assignTasks',
            options: {
                sort: "-createdAt",
              },
            populate:{
                path:'reviewer recipient'
            }
        });
        console.log('current user **********\n',findUser.assignTasks);
        return res.render('employeeTasks.ejs',{
            layout:'../layouts/layout2.ejs',
            title:"Tasks",
            employee:findUser,
            assignTasks:findUser.assignTasks
        });
    } catch (error) {
        console.log('error while adding  Feedback',error);
        return res.redirect('back');
    }

}

//complete assign task employee
exports.completeAssignTask = async (req,res)=>{
    try {
        // add feedback 
        const data = req.body;// data={feedback:,from,to}
        console.log("data",data);
        const recipientId = data.to;//receiver,receive a feedback
        const reviewerId = data.from;

        const newFeedback = await Feedback.create({
            user:recipientId,// that user which belong to feedback(feedback of that person)
            ...data
        });
        
        //find user and add new feedback to that user which belong to feedback (to:,recipient)
        const findRecipient = await User.findById(recipientId).populate('assignTasks');
        findRecipient.feedbacks.push(newFeedback.id);
        findRecipient.save();
        
       // find and delete task (to complete task)
        await AssignTask.findByIdAndDelete(data.taskId);
        const findReviewer = await User.findById(req.user.id).populate('assignTasks');
        const updatedAssignTaskArray = findReviewer.assignTasks.filter((task)=> {
            console.log("ids", task.id , data.taskId,findReviewer);
            if( task.id !== data.taskId){
                return true;
            }
            return false;
        });
        console.log('findReviewer assign array update',updatedAssignTaskArray);
        findReviewer.assignTasks = updatedAssignTaskArray;
        
        findReviewer.save();//save in db
    
       console.log('assign tasks',await AssignTask.find({}),'user',findReviewer);
        return res.redirect('back');
        
        // delete complete task from db and also from current user document(within assignTasks array)  
        //    const findUser = await User.findById(req.user.id);
        //    const index = findUser.assignTasks.indexOf(data.taskId);
        // findUser.assignTasks[index].remove();
        
        // through ref change array
        // const findReviewer = await User.findById(data.reviewer).populate('assignTasks');
    //     const find = findReviewer.assignTasks.filter((task)=> task.recipient.id === data.recipient.id);
    //     if(find.length !== 0 ){
    //     // for to already an task for that employee
    //     return res.redirect('back');
    // }
        // console.log("||||INDEX||||",index);
        // findUser.assignTasks.splice(index,1);
    } catch (error) {
        console.log('error while completeAssignTask controller ',error);
        return res.redirect('back');
    }

}
