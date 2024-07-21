const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/', (req, res) => {

    res.render('index');
})

router.get('/login', (req, res) => {

    res.render('login');
})

router.get('/register', (req, res) => {

    res.render('register')

       
 

})

router.get('/addExpense', (req, res) => {
    
    res.render("addExpense");
})


module.exports = router;