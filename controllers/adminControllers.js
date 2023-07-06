const AssignTask = require("../models/assignTaskSchema");
const Employee = require("../models/employeeSchema");
const Admin = require("../models/adminSchema");
const Feedback = require('../models/feedbackSchema');

// dashboard of admin contain all employees/ all users
exports.dashboard = async (req,res)=>{
   try {
    if(req.isAuthenticated() && req.user.role === "admin"){
        //find user and show admin dashboard page ,and display then all users/employee
        const employees = await Employee.find({}).sort('-createdAt');
        const adminInDb = await Admin.find({});//only one admin in db always
        let admin = {};
        if(adminInDb.length !== 0){
            admin = adminInDb[0];
        }
        return res.render('./admin pages/adminDashboard.ejs',{title:'Dashboard',employees,admin});
        }
        return res.redirect('/signin');
   } catch (error) {
    console.log("error while adding user/employee",error);
    return res.redirect('back');
   }
}

// add employee controllers
exports.addEmployee = async (req,res)=>{
   try {
    if(req.isAuthenticated() && req.user.role==="admin"){
        const employee = req.body;

        //finding employee, is already exist or not
        const findEmployee = await Employee.findOne({email:employee.email});
        if(findEmployee !== null || employee.password !== employee.confirmPassword){
            return res.redirect('back');
        }

        //create use if not exist
        await Employee.create({...employee});
        req.flash('success',' Successfully created an employee');
        return res.redirect('back');
    }
    return res.redirect('/signin');
   } catch (error) {
    console.log("error while adding user/employee",error);
    return res.redirect('back');
   }
}

// update employee controllers
exports.updateEmployee = async (req,res)=>{
    try {
        if(req.isAuthenticated() && req.user.role==="admin"){
            const employee = req.body;
            const employeeId = req.params.employeeId;//userId or employeeId
            //update
            await Employee.updateOne({_id:employeeId},employee);
            req.flash('success',' Successfully updated an employee');
            return res.redirect('back');// /admin/dashboard          
        }
         return res.redirect('/signin');     
    } catch (error) {
        console.log("error while updating user",error);
        return res.redirect('back');
       }
}

// delete employee controllers
exports.deleteEmployee = async (req,res)=>{
   try {
        if(req.isAuthenticated() && req.user.role==="admin"){
            const employeeId = req.params.employeeId;

            //deleting  user from db and also assign task and feedback belong to user in db (assign task and feedback)
            await AssignTask.deleteMany({reviewer:employeeId});
            await Feedback.deleteMany({to:employeeId});
            await Employee.deleteOne({_id:employeeId});

            req.flash('success',' Successfully deleted an employee');
            return res.redirect('back');// /admin/dashboard
        }
        return res.redirect('/signin');  
    } catch (error) {
       console.log("error while delete user",error);
       return res.redirect('back');
   }
}

// assign review controllers
exports.assignTask = async (req,res)=>{

    try {
         if(req.isAuthenticated() && req.user.role==="admin"){
            const data = req.body;//{reviewer:id,recipient:id,user:id}

            //find user /employee and add review id in review array
            const reviewer = await Employee.findById({_id:data.reviewer}).populate({
                path:'assignTasks',
                populate:{
                    path:"reviewer recipient"
                }
            });

            //check for if current employee/user having a task to do for same employee already or not
            const findTask = reviewer.assignTasks.filter((task)=> {
                if(task.recipient.id === data.recipient){
                    return true;
                }return false;
            });

            //if already exist a task for an employee in current request
            if(findTask.length !== 0 ){
                return res.redirect('back');
            }
        
            // if not exist than create new task and assign to reviewer/current session user
            const newAssignTask = await AssignTask.create({
                ...data,
            });

            reviewer.assignTasks.push(newAssignTask.id);//save on RAM
            reviewer.save();//save in db
            
            req.flash('success',' Successfully assign task to an employee');
            return res.redirect('back');
         }
         return res.redirect('/signin');
    } catch (error) {
        console.log("error while assign review to user",error);
        return res.redirect('back');
    }
}

// make admin controllers
exports.makeAdmin = async (req,res)=>{

    try {
        if(req.isAuthenticated() && req.user.role==="admin"){
            const employeeId = req.params.employeeId;
            const employee = await Employee.findById({_id:employeeId});
        
            //toggling role in db
            if(employee.role === 'employee'){
            await Employee.updateOne({_id:employeeId},{role:'admin'});
            }else{
            await Employee.updateOne({_id:employeeId},{role:'employee'});
            }

            req.flash('success',' Successfully make admin to an employee');
            return res.redirect('back');
        }
        return res.redirect('/signin');   
    } catch (error) {
        console.log("error while assign making admin to an employee to user",error);
        return res.redirect('back');
    }
}