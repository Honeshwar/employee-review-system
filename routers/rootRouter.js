const express =require('express');
const router = express.Router();//return MW
const rootControllers = require('../controllers/rootControllers.js');
// console.log(rootControllers);
//routers
router.get('/',rootControllers.home);
router.get('/signIn',rootControllers.signInPage);
router.get('/signUp',rootControllers.signUpPage);
router.post('/signIn',rootControllers.signIn);
router.post('/signUp',rootControllers.signUp);




module.exports = router;// single export only work , not use multiple work ho ga
