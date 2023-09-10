const express = require('express');
const router = express.Router();
const checkRights = require('../utils/checkRights');
const testController = require('../controllers/index.js').testController;

router.get('/',checkRights("user"),  testController.getTests); 
router.post('/',checkRights("admin"),  testController.postTest);   
router.get('/:id',checkRights("user"),  testController.getTest); 
router.put('/:id',checkRights("admin"),  testController.putTest) 
router.delete('/:id',checkRights("admin"),  testController.deleteTest); 


module.exports = router;
