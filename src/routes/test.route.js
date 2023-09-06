const express = require('express');
const router = express.Router();
const checkRights = require('../utils/checkRights');

// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
const testController = require('../controllers/index.js').testController;

router.get('/',checkRights("admin"),  testController.getTests); // List all users public (public cutted info)
router.post('/',checkRights("admin"),  testController.postTest); // Create a street write     
router.get('/:id',checkRights("admin"),  testController.getTest); // Retrieve a street read (read full info)
router.put('/:id',checkRights("admin"),  testController.putTest) // Update a street write PUT && PATCH
router.delete('/:id',checkRights("admin"),  testController.deleteTest); // Delete a street write


module.exports = router;
