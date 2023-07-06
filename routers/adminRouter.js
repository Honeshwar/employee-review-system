const express =require('express');
const router = express.Router();//return MW
const adminControllers = require('../controllers/adminControllers.js');

//routes
//related to employee view/add/update/delete Operation (CRUD Operation)
router.get('/dashboard',adminControllers.dashboard);//show all employees
router.post('/add-employee',adminControllers.addEmployee);
router.post('/update-employee/:employeeId',adminControllers.updateEmployee);
router.get('/delete-employee/:employeeId',adminControllers.deleteEmployee);

//related to assign work to employee and view/add/update review
router.get('/make-admin/:employeeId',adminControllers.makeAdmin);
router.post('/assign-task-to-employee',adminControllers.assignTask);
router.use('/feedback',require('./feedbackRouter.js'));//req.url start /admin call this MW


module.exports = router;