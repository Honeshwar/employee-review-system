const express =require('express');
const router = express.Router();//return MW
const rootControllers = require('../controllers/rootControllers.js');
// console.log(rootControllers);
const passport = require("passport");
//routers
router.get('/dashboard',rootControllers.home);
router.get('/add-review',rootControllers.signInPage);


module.exports = router;// single export only work , not use multiple work ho ga
