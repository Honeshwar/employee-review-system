console.log("passport.js file execute and export");
const passport = require('passport');//library import {environment create for strategy to use}
const User = require('../models/userSchema');
const localStrategy = require('passport-local').Strategy;// strategy import ,like this one is manual auth based (create own strategy), some other strategy also like google auth, github auth, facebook auth ,linkdin auth ,etc.. provide its authentication system for verification a user in our app
const env = require('../config/env')

passport.use(new localStrategy({
    usernameField:"email",//predefined field
    passwordField:'password',
    passReqToCallback:true //this option help us to access req in cb below
    
  }, async function (req,email,password,done) { 
      try {
        console.log("local strategy executing");
        const userInDb = await User.findOne({email:email});

        if(!userInDb || userInDb.password !== password){//!userInDb= userInDb equal to null
          return done(null,false,{message:'Incorrect username/password'})
        }

      return done(null,userInDb);
      } catch (error) {
        return done(err,false);
      }
  })
  );


// serialize the data when it set to cookie.
passport.serializeUser(function(user, done) {
  console.log("serializeUser executing");
    done(null, user._id);
});
  
// deserialize id for every request.
  passport.deserializeUser( async function(id, done) {
    try {
      console.log("passport deserializeUser executing");
      const user = await User.findById(id)
      return done(null, user);
    } catch (error) {
      if(error){
        console.log('error in finding user --> passport deserialzer');
        return done(error);
    }
    }
  });

  // i will use this middleware to check authenticity 
  passport.setAuthenticatedUser = async function(req,res,next){
    console.log("set Authenticated User executing");
    if(req.isAuthenticated()){
      console.log("set Authenticated User executing");
      res.locals.currentSessionUser = req.user;
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

passport.ensureAuthentication = function(req,res,next){
  if(req?.isAuthenticated()){
    next();
  }
  return res.redirect('/signin');

}
// like if(req.cookies.user_session){} this MW do work

passport.notAuthentication = function(req,res,next){
  if(req?.isAuthenticated()){
    return res.redirect('/admin/dashboard/');
  }
  next();//got to signInPage controller next

}
module.exports = passport;