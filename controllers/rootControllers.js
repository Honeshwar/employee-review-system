const Employee = require("../models/employeeSchema");

//home controllers
module.exports.home = async function home(req,res) {//module.exports=  // const abc = require(); abc= [function:home] //default export ,not export other things
    // return res.status(200).render('home.ejs',{layout:"../layouts/layout.ejs",title:"Home"});

    //template engine searching all files in views/pages directory (that we set in index.js file entry point file);

    // so to make layout file change while rendering we have to go up in hierarchy chain of directory 


console.log(req.cookies[0]);
    if(!req.cookies[0]){
        const employees = await Employee.find({})
        console.log('all employes in employes collection',employees);
        return res.status(200).render('home.ejs',{layout:"../layouts/layout.ejs",title:"Home",employees});
    }
    return res.redirect('/signin');


}

// get signIn page controllers
exports.signInPage = function signIn(req,res) {
    return res.render('signIn.ejs',{title:"SignIn Form"});
}

//get signUp page controllers
exports.signUpPage =  function signUp(req,res) {
    return res.render('signUp.ejs',{title:"SignUp Form"});

}



// signIn employee controllers
exports.signIn = async function signIn(req,res) {
    // const employee = req.body;
    // const fondedEmployee = await Employee.find(req.body)
    // console.log('signIn employee in Employee collection',fondedEmployee);
    // return res.render('signIn.ejs',{title:"SignIn Form"});

    // return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"Invalid username/password!!!"});
    try {
        console.log('form data',req.body);
        const employee = req.body;
        const employeeInDb = await Employee.find({email:employee.email});
        console.log("employeeInDb",employeeInDb);
        if(employeeInDb.length === 0|| employeeInDb.password !== employee.confirm_password){
            return res.status(400).render('signIn.ejs',{title:"SignIn Form",error:"Invalid username/password!!!"});
        }
    
        return res.redirect('/');
    } catch (error) {
        return console.log('error while submitting signUp form',error);
    }
}

// signUp employee controllers
exports.signUp = async function signUp(req,res) {
   
    try {
        console.log('form data',req.body);
        const employee = req.body;
        if(employee.password !== employee.confirm_password){
            return res.status(400).render('signUp.ejs',{title:"SignUp Form",error:"Password doesn't match!!!"});
        }
    
       const newEmployee =  await Employee.create({
            name:employee.name,
            email:employee.email,
            password:employee.password
        });
    
        console.log('new employee',newEmployee);
        return res.redirect('/');
    } catch (error) {
        return console.log('error while submitting signUp form',error);
    }
}


