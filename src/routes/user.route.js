const express = require('express');
const router = express.Router();
const checkRights = require('../utils/checkRights');
const userController = require('../controllers/index.js').userController;

router.get('/',checkRights("admin"),  userController.getUsers); 
router.post('/',checkRights("admin"),  userController.postUser);    
router.get('/:id',checkRights("user"),  userController.getUser); 
router.put('/:id',checkRights("user"),  userController.putUser) 
router.delete('/:id',checkRights("admin"),  userController.deleteUser); 


module.exports = router;
