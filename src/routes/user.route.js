const express = require('express');
const router = express.Router();
const checkRights = require('../utils/checkRights');

// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
const userController = require('../controllers/index.js').userController;

router.get('/',checkRights("user"),  userController.getUsers); // List all users public (public cutted info)
router.post('/',checkRights("admin"),  userController.postUser); // Create a street write     
router.get('/:id',checkRights("user"),  userController.getUser); // Retrieve a street read (read full info)
router.put('/:id',checkRights("user"),  userController.putUser) // Update a street write PUT && PATCH
router.delete('/:id',checkRights("admin"),  userController.deleteUser); // Delete a street write


module.exports = router;
