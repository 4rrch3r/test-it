const express = require('express');
const router = express.Router();
const checkRights = require('../utils/checkRights');
const resultController = require('../controllers/index.js').resultController;

router.get('/',checkRights("admin"),  resultController.getResults); 
router.post('/',checkRights("user"),  resultController.postResult);    
router.get('/:id',checkRights("user"),  resultController.getResult); 
router.put('/:id',checkRights("admin"),  resultController.putResult) 
router.delete('/:id',checkRights("admin"),  resultController.deleteResult); 


module.exports = router;
