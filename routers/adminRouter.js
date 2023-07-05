const express =require('express');
const router = express.Router();//return MW
const adminControllers = require('../controllers/adminControllers.js');
// console.log(adminControllers);
const passport = require("passport");
//routers
//related to employee CRUD Operation
router.get('/dashboard',adminControllers.dashboard);//show all employees
router.post('/add-employee',adminControllers.addEmployee);
router.post('/update-employee/:id',adminControllers.updateEmployee);
router.get('/delete-employee/:id',adminControllers.deleteEmployee);

//related to assign work to employee and view/add.update review
router.get('/make-admin/:id',adminControllers.makeAdmin);
router.post('/assign-task-to-employee',adminControllers.assignTask);
router.use('/feedback',require('./feedbackRouter.js'));//req.url start /admin call this MW


module.exports = router;// single export only work , not use multiple work ho ga
