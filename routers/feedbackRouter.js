const express =require('express');
const router = express.Router();//return MW
const feedbackControllers = require('../controllers/feedbackControllers.js');

//routes
router.get('/',feedbackControllers.viewAllFeedback);//show all feedback
router.post('/add',feedbackControllers.addFeedback);
router.post('/update/:feedbackId',feedbackControllers.updateFeedback); 

module.exports = router;