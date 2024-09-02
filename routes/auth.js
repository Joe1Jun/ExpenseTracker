const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')
const verifyToken = require('../middleware/auth');


router.post('/register', authController.register);

   

router.post('/login', authController.login);

router.get('/logout', authController.logout)

router.post('/deleteAccount', authController.deleteAccount)

router.post('/addExpense', verifyToken,  authController.addExpense)

router.post('/deleteExpense', verifyToken,  authController.deleteExpense ) 

module.exports = router;