const express = require('express');
const router = express.Router();
const checkRights = require('../utils/checkRights');

// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
const resultController = require('../controllers/index.js').resultController;

router.get('/',checkRights("admin"),  resultController.getResults); // List all users public (public cutted info)
router.post('/',checkRights("admin"),  resultController.postResult); // Create a street write     
router.get('/:id',checkRights("admin"),  resultController.getResult); // Retrieve a street read (read full info)
router.put('/:id',checkRights("admin"),  resultController.putResult) // Update a street write PUT && PATCH
router.delete('/:id',checkRights("admin"),  resultController.deleteResult); // Delete a street write


module.exports = router;
