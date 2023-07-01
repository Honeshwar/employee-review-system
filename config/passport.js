
const passport = require('passport');//library import {environment create for strategy to use}
const Employee = require('../models/employeeSchema');
const localStrategy = require('passport-local').Strategy;// strategy import ,like this one is manual auth based (create own strategy), some other strategy also like google auth, github auth, facebook auth ,linkdin auth ,etc.. provide its authentication system for verification a user in our app


passport.use(new localStrategy({
    usernameField:"email",//predefined field
    passwordField:'password'
}
,
function (email,password,done) { 
    Employee.findOne({email:email},function (err,employee) {
        if(err){
            return done(err,false,{message:'Incorrect username/password'});
        }

        if(!employee || employee.password !== password){
            return done(null,false,{message:'Incorrect username/password'})
        }

        return done(null,user);
    })
 }
));


// serialize the data when it set to cookie.
passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
// deserialize id for every request.
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if(err){
        console.log('error in finding user --> passport deserialzer');
        return done(err);
    }
      return done(null, user);
    });
  });

  // i will use this middleware to check authenticity 
  passport.setAuthenticatedUser = async function(req,res,next){
    if(req.isAuthenticated()){
      // console.log(req.user);
      res.locals.user = req.user;
    }
    next();
}
passport.autherizedAdmin=function(req,res,next){
  // check for super user
  if(req.isAuthenticated()&& res.locals.user.userType==="admin"){
    next();
  }
  else {
    console.log("you are not autherised admin.");
    return res.end("you are not autherized admin")
  }
}
passport.autherizedUser=function(req,res,next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    console.log("you are not autherized");
    return res.redirect('/signin')
  }
}
module.exports = passport;