const Employee = require("../models/employeeSchema");//user =  employees
const Admin = require("../models/adminSchema");//user = admin 
const env = require('../config/env');

//home controllers
module.exports.home = async function home(req,res) {
    if(req.isAuthenticated()){
        if(req.user?.role === 'admin'){//user it set by passport in request
            return res.redirect('/admin/dashboard');
        }
        return res.redirect(`/employee/dashboard/`);
    
    }
    return res.redirect('/signin');
}

// get signIn page controllers
exports.signInPage = function signIn(req,res) {
    if(req.isAuthenticated()){
        if(req.user?.role === 'admin'){
            return res.redirect('/admin/dashboard');
        }
        return res.redirect(`/employee/dashboard/`);
    
    }
    return res.render('./auth pages/signIn.ejs',{
        layout:'../layouts/beforeAddingSessionLayout.ejs',//current path of views in template engine is "./views/pages"
        title:"SignIn Form"
    });
}

//get signUp page controllers
exports.signUpPage =  function signUp(req,res) {
    if(req.isAuthenticated()){
        if(req.user?.role === 'admin'){
            return res.redirect('/admin/dashboard');
        }
        return res.redirect(`/employee/dashboard/`);//${userInDb.id}
    
    }
    return res.render('./auth pages/signUp.ejs',{
        layout:'../layouts/beforeAddingSessionLayout.ejs',
        title:"SignUp Form"
    });

}



// signIn employee controllers
exports.signIn = async function signIn(req,res) {
    try {
        const user = req.body;
        if(user.role === 'admin'){
            req.flash('success','Admin Successfully signIN ');// and created session');
            return res.redirect('/admin/dashboard');
        }
        req.flash('success','Employee Successfully signIn ');// and created session');
        return res.redirect(`/employee/dashboard/`);

        // failure will be handle by passport MW add in signIn route
    } catch (error) {
        console.log("error will signin",error);
        req.flash('error',"error while submitting signIn form!!!");
        return res.redirect('back');
    }
}

// signUp employee controllers
exports.signUp = async function signUp(req,res) {
   
    try {
        const user = req.body;
        const admin = env.DEVELOPMENT.admin;

        //checking for password and confirm password is matches or not
        if( user.password !== user.confirm_password){
             //render same page with an error property
             req.flash('error',"Password doesn't matches!!!");
             return res.redirect('back');
        }

        //if user role is admin and admin_token is not correct show error on signup page
        if(user.role === "admin"){//owner
            if(user.admin_token !== admin.admin_token){
                //render same page with an error property
                req.flash('error',"You are not admin!!!");
                return res.redirect('back');               
            }

               
                // const adminInDb = await Admin.findOne({email:user.email});
                const ownerAdminInDb = await Admin.find({});
                if(ownerAdminInDb.length !== 0 ){
                    //render same page with an error property
                    req.flash('error',"Admin is SignUp Already!!!");
                    return res.redirect('back');
                }

                 //check user email already exist or not in employee collection
                 const userInDb = await Employee.findOne({email:user.email});
                 if(userInDb){
                    req.flash('error',"User with this email address already exist!!!");
                    return res.redirect('back');
                 }

             //if not exist create new one
                await Admin.create({
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    role:user.role,
                });
       
        }else{
            //check user already exist or not
            const userInDb = await Employee.findOne({email:user.email});
            if(userInDb){
                req.flash('error',"User with this email address already exist!!!");
                return res.redirect('back');
            }
    
            //if not exist create new one
            await Employee.create({
                name:user.name,
                email:user.email,
                password:user.password,
                role:user.role,
                assignTasks:[],
                feedbacks:[]
            });
        
        }
        
        return res.redirect('/signin');
    } catch (error) {
         console.log('error while submitting signUp form',error);
        req.flash('error',"error while submitting signUp form!!!");
         return  res.redirect('/back');
    }
}

//sign out controller
exports.signOut = (req,res)=>{
    const role = req.user.role;
    //removing session, so that user will logout
    req.logout(function(err) {
            if (err) { 
                console.log(err);
                req.flash('error',"error while sign out!!!");
                return res.redirect('back')
            }
            
            if(role === "admin"){
                req.flash('success','Admin Successfully signOut ');// and destroyed created session');
            }else{
                req.flash('success','Employee Successfully signOut ');// and destroyed created session');
            }
            
            return res.redirect('/signin');
        }); 

}

