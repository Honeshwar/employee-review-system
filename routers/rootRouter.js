const express =require('express');
const router = express.Router();//return MW
const rootControllers = require('../controllers/rootControllers.js');
const passport = require('passport');
//routes
  router.get('/',rootControllers.home);
  router.get('/signIn',rootControllers.signInPage);
  router.get('/signUp',rootControllers.signUpPage);
  router.post('/signIn',passport.authenticate('local', {
      // successRedirect: '/',
      failureRedirect: '/signin',
    })
    ,rootControllers.signIn);
  router.post('/signUp',rootControllers.signUp);
  router.get('/signout',rootControllers.signOut);

  router.use('/admin',require("./adminRouter.js"));
  router.use('/employee',require("./employeeRouter.js"));

  
module.exports = router;
