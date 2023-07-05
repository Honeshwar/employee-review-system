const express =require('express');
const router = express.Router();//return MW
const employeeControllers = require('../controllers/employeeControllers.js');
// console.log(employeeControllers);
const passport = require("passport");
//routers
router.get('/dashboard',employeeControllers.employeeDashboard);
// router.post('/add-feedback/',employeeControllers.addFeedback);//id pass as post input type hidden
router.post('/feedback/add',employeeControllers.addFeedback);//req.url start /admin call this MW
router.get('/tasks',employeeControllers.getTasks);
router.post('/tasks/completed',employeeControllers.completeAssignTask);//req.url start /admin call this MW


module.exports = router;// single export only work , not use multiple work ho ga
