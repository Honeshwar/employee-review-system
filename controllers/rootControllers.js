//home controllers
module.exports.home = function home(req,res) {//module.exports=  // const abc = require(); abc= [function:home] //default export ,not export other things
    return res.status(200).render('home.ejs',{layout:"../layouts/layout.ejs",title:"Home"});

    //template engine searching all files in views/pages directory (that we set in index.js file entry point file);

    // so to make layout file change while rendering we have to go up in hierarchy chain of directory 
}

// signIn controllers
exports.signIn = function signIn(req,res) {
    return res.render('signIn.ejs',{title:"SignIn Form"});
}

// signUp controllers
exports.signUp = function signUp(req,res) {
    return res.render('signUp.ejs',{title:"SignUp Form"});
}