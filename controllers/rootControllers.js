const User = require("../models/userSchema");//user = admin + employees
const env = require('../config/env');
//home controllers
module.exports.home = async function home(req,res) {
// console.log('req.session',req.session);   
/**req.session, Session {
  cookie: {
    path: '/',
    _expires: 2023-07-01T11:56:55.671Z,
    originalMaxAge: 6000000,
    httpOnly: true,
    secure: null,
    domain: null,
    sameSite: null
  },
  //added each session
  passport: { user: new ObjectId("649eb91455f155378c841f12") }
}
 */
    // if(req.isAuthenticated()){
    //     const users = await User.find({})
    //     return res.status(200).render('adminDashboard.ejs',{layout:"../layouts/layout2.ejs",title:"Home",users});
    // }
    // return res.redirect('/signin');

    return res.redirect('/signin');


}

// get signIn page controllers
exports.signInPage = function signIn(req,res) {
    if(req.isAuthenticated()){
        if(req.user?.role === 'admin'){
            return res.redirect('/admin/dashboard');
        }
        return res.redirect(`/employee/dashboard/`);//${userInDb.id}
    
    }
    return res.render('signIn.ejs',{title:"SignIn Form"});
}

//get signUp page controllers
exports.signUpPage =  function signUp(req,res) {
    if(req.isAuthenticated()){
        if(req.user?.role === 'admin'){
            return res.redirect('/admin/dashboard');
        }
        return res.redirect(`/employee/dashboard/`);//${userInDb.id}
    
    }
    return res.render('signUp.ejs',{title:"SignUp Form"});

}



// signIn employee controllers
exports.signIn = async function signIn(req,res) {

    console.log('form data at sign in',req.body);
    const userInDb = await User.findOne({email:req.body.email});
    if(userInDb.role === 'admin'){
        return res.redirect('/admin/dashboard');
    }
    return res.redirect(`/employee/dashboard/`);//${userInDb.id}

    // failure will be handle by passport MW add in signIn route

//    try {
      
//         console.log('form data at sign in',req.body);
//         const user = req.body;

//         const userInDb = await Employee.findOne({email:user.email});
//         // console.log("userInDb",userInDb);
//         if(userInDb === null  || userInDb.password !== user.password){
//             return res.status(400).render('signIn.ejs',{title:"SignIn Form",error:"Invalid username/password!!!"});
//         }
//        if(userInDb.role === 'admin'){
//             return res.redirect('/admin/dashboard');
//         }
//         return res.redirect('/employee/dashboard');
    

//         // using passport for below thing and also above thing
//         /** passport for setting cookie */
//     //     console.log('req.login',req.login,req.logIn);
//     //       // Log in the user after successful registration
//     //         req.login(userInDb, (err) => {
//     //         if (err) {
//     //         console.log(err);
//     //         }
//     //         return res.redirect('/');
//     //     // res.redirect('/dashboard'); // Redirect to a protected route
//     //   });
//     } catch (error) {
//         return console.log('error while submitting signUp form',error);
//     }


}

// signUp employee controllers
exports.signUp = async function signUp(req,res) {
   
    try {
       
        console.log('form data',req.body);
        const user = req.body;
        const admin = env.DEVELOPMENT.admin;
        //if user role is admin
        if(user.role === "admin"){
            if(user.email !== admin.email && user.password !== admin.password){
                return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"You are not admin!!!"});
            }
        }
        const userInDb = await User.findOne({email:user.email});
        console.log("userInDb",userInDb);
        if(userInDb){
            return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"User with this email already exist!!!"});
        }
        if( user.password !== user.confirm_password){
            return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"Password doesn't match!!!"});
        }
    
       const newUser =  await User.create({
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role
        });
    
        console.log('new employee/user/admin',newUser);
        return res.redirect('/');
    } catch (error) {
        return console.log('error while submitting signUp form',error);
    }
}


exports.signOut = (req,res)=>{

    req.logout(function(err) {
            console.log('logout');
            if (err) {  console.log(err);}
            
            return res.redirect('/signin');
        }); 

}














/** old code */
// const Employee = require("../models/employeeSchema");

// //home controllers
// module.exports.home = async function home(req,res) {//module.exports=  // const abc = require(); abc= [function:home] //default export ,not export other things
//     // return res.status(200).render('home.ejs',{layout:"../layouts/layout.ejs",title:"Home"});

//     //template engine searching all files in views/pages directory (that we set in index.js file entry point file);

//     // so to make layout file change while rendering we have to go up in hierarchy chain of directory 


// // console.log('req cookies in home',req.cookies,req.cookies["connect.sid"]);
// console.log('req.session',req.session);   
// /**req.session, Session {
//   cookie: {
//     path: '/',
//     _expires: 2023-07-01T11:56:55.671Z,
//     originalMaxAge: 6000000,
//     httpOnly: true,
//     secure: null,
//     domain: null,
//     sameSite: null
//   },
//   //added each session
//   passport: { user: new ObjectId("649eb91455f155378c841f12") }
// }
//  */
// if(req.isAuthenticated()){
//         const employees = await Employee.find({})
//         // console.log('all employes in employes collection',employees);
//         return res.status(200).render('home.ejs',{layout:"../layouts/layout.ejs",title:"Home",employees});
//     }
//     return res.redirect('/signin');


// }

// // get signIn page controllers
// exports.signInPage = function signIn(req,res) {
//     if(req.isAuthenticated()){
//         return res.redirect('/');
//     }
//     return res.render('signIn.ejs',{title:"SignIn Form"});
// }

// //get signUp page controllers
// exports.signUpPage =  function signUp(req,res) {
//     if(req.isAuthenticated()){
//         return res.redirect('/');
//     }
//     return res.render('signUp.ejs',{title:"SignUp Form"});

// }



// // signIn employee controllers
// exports.signIn = async function signIn(req,res) {
//     // const employee = req.body;
//     // const fondedEmployee = await Employee.find(req.body)
//     // console.log('signIn employee in Employee collection',fondedEmployee);
//     // return res.render('signIn.ejs',{title:"SignIn Form"});

//     // return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"Invalid username/password!!!"});
//     try {
      
//         console.log('form data at sign in',req.body);
//         const employee = req.body;
//         const userInDb = await Employee.findOne({email:employee.email});
//         console.log("userInDb",userInDb);
//         if(userInDb === null  || userInDb.password !== employee.password){
//             return res.status(400).render('signIn.ejs',{title:"SignIn Form",error:"Invalid username/password!!!"});
//         }
    
//         console.log('req.cookies',req.cookies,req.cookie,res.cookie,userInDb._id);
//         // res.cookie('employee_session',userInDb._id);//this value + secret combine new unique string create = cookie at client and server db

//         /** passport for setting cookie */
//         console.log('req.login',req.login,req.logIn);
//           // Log in the user after successful registration
//         req.login(userInDb, (err) => {
//         if (err) {
//           console.log(err);
//         }
//         return res.redirect('/');
//         // res.redirect('/dashboard'); // Redirect to a protected route
//       });
//         // return res.redirect('/');
//     } catch (error) {
//         return console.log('error while submitting signUp form',error);
//     }
// }

// // signUp employee controllers
// exports.signUp = async function signUp(req,res) {
   
//     try {
       
//         console.log('form data',req.body);
//         const employee = req.body;
//         if(employee.password !== employee.confirm_password){
//             return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"Password doesn't match!!!"});
//         }
    
//        const newEmployee =  await Employee.create({
//             name:employee.name,
//             email:employee.email,
//             password:employee.password
//         });
    
//         console.log('new employee',newEmployee);
//         return res.redirect('/');
//     } catch (error) {
//         return console.log('error while submitting signUp form',error);
//     }
// }


// exports.signOut = (req,res)=>{

// //    res.clearCookie('employee_session');//destroy session time of user to in app
// //    return  res.redirect('/signin');//again create session by logic so user redirect to signIn page
// // console.log(req);
// //  req.logout(function(err) {
// //     console.log('logout');
// //     if (err) {  console.log(err)
// //   }});

//     req.logout(function(err) {
//             console.log('logout');
//             if (err) {  console.log(err);}
            
//             return res.redirect('/signin');
//         }); // Clears user's session information
//     // req.session.destroy(); // Destroys the entire session
//     // res.redirect('/'); // Redirect to the desired page after logout


// }