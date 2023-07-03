const express =require('express');
const router = express.Router();//return MW
const reviewControllers = require('../controllers/reviewControllers.js');
// console.log(reviewControllers);
const passport = require("passport");
//routers
router.get('/',reviewControllers.viewAllReview);//show all review
router.get('/add',reviewControllers.signInPage);
router.get('/update',reviewControllers.signInPage);

module.exports = router;// single export only work , not use multiple work ho ga
