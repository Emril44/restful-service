const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// get all user
router.get('/', userController.getAllUsers);

// create new user
router.post('/', userController.createUser);

// send email to all users
router.post('/send-email', userController.sendEmail);

// get specific user by ID
router.get('/:id', userController.getUserById);

// update user by ID
router.put('/:id', userController.updateUserById);

// delete user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;