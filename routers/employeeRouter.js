const express =require('express');
const router = express.Router();//return MW
const employeeControllers = require('../controllers/employeeControllers.js');

//routes
router.get('/dashboard',employeeControllers.employeeDashboard);
router.get('/tasks',employeeControllers.getTasks);
router.post('/feedback/add',employeeControllers.addFeedback);
router.post('/tasks/completed',employeeControllers.completeAssignTask);


module.exports = router;
