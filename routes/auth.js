const express = require("express");
const router = express.Router();



router.post('/register', (req, res) => {

    res.render('register');
})

router.post('/login', (req, res) => {

    res.render('login');
})

module.exports = router;