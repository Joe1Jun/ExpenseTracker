const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')
const verifyToken = require('../middleware/auth');


router.post('/register', authController.register);

   

router.post('/login', authController.login);

router.post('/addExpense', verifyToken,  authController.addExpense)

router.post('/deleteExpense', verifyToken,  authController.deleteExpense ) 

module.exports = router;