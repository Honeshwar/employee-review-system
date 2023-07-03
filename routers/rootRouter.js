const express =require('express');
const router = express.Router();//return MW
const rootControllers = require('../controllers/rootControllers.js');
// console.log(rootControllers);
const passport = require("passport");
//routers
router.get('/',rootControllers.home);
router.get('/signIn',rootControllers.signInPage);
router.get('/signUp',rootControllers.signUpPage);
router.post('/signIn',passport.authenticate('local', {
  // successRedirect: '/',
  failureRedirect: '/signin',
}),rootControllers.signIn);// due to MW signIn Controller not execute,because successRedirect: '/',
router.post('/signUp',rootControllers.signUp);
router.get('/signout',rootControllers.signOut);

router.use('/admin',require("./adminRouter.js"));//req.url start /admin call this MW
router.use('/employee',require("./employeeRouter.js"));


module.exports = router;// single export only work , not use multiple work ho ga
