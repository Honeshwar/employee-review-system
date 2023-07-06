//setup passport
const passport = require('passport');
const User = require('../models/employeeSchema');
const Admin = require("../models/adminSchema");
const localStrategy = require('passport-local').Strategy;

 
//setup localStrategy MW
passport.use(new localStrategy({
    usernameField:"email",//predefined field
    passwordField:'password',
    passReqToCallback:true //this option help us to access req in cb below
    
  }, async function (req,email,password,done) { 
      try {
        console.log("local strategy executing");
       
        if(req.body.role === 'admin'){
            const adminInDb = await Admin.findOne({email:email});

            //if admin not fount in db ,now find employee as admin
            if (!adminInDb){
                //finding user and matching password , role=admin
                const userInDb = await User.findOne({email:email});

                if(!userInDb ){
                  req.flash('error','Admin with this data not exist!!!');
                  return done(null,false);
                }
                if(userInDb.role !== 'admin' ){
                  req.flash('error','Your are not admin, select correct role');
                  return done(null,false);
                }
                if( userInDb.password !== password){
                  req.flash('error','Invalid username/password');
                  return done(null,false);
                }
                req.flash('success','Assigned admin : Successfully signIN / created session');
              return done(null,userInDb);
            }
            //finding admin and matching password
            if( adminInDb.password !== password){
              req.flash('error','Invalid username/password');//key/value
              return done(null,false);
            }
            req.flash('success','ADMIN : Successfully signIN / created session');
         return done(null,adminInDb);
        }else{
            //finding user and matching password, role= employee
            const userInDb = await User.findOne({email:email});
            if(!userInDb ){
              req.flash('error','Employee with this data not exist!!!');
              return done(null,false);
            }
            if(userInDb.role !== 'employee' ){
              req.flash('error','Your are not employee, select correct role');
              return done(null,false);
            }
            if( userInDb.password !== password){
              req.flash('error','Invalid username/password');
              return done(null,false);
            }
            req.flash('success','Employee : Successfully signIN / created session');
          return done(null,userInDb);
        }
      } catch (error) {
        return done(err,false);
      }
  })
  );

// serialize the data when it set to cookie.
passport.serializeUser(function(user, done) {
  console.log(" User get serialize");
    done(null, user._id);
});
  
// deserialize id for every request.
passport.deserializeUser( async function(id, done) {
  try {
    console.log("user get deserializeUser");

    // find user in admin db by id
    const adminInDb = await Admin.findById(id);
    if(adminInDb){
      return done(null,adminInDb);
    }

    // if not admin than find for user in user/employee schema
    const userInDb = await User.findById(id)
    return done(null,userInDb);

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
      console.log("set Authenticated User in locals");
      res.locals.currentSessionUser = req.user;
    }
    next();
}


module.exports = passport;