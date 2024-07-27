const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const db = require("../database");
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken,(req, res) => {

    const name = req.user.name;
    res.render('index', {
        name: name
    });
})

router.get("/login", (req, res) => {

    res.render("login");
})

router.get('/register', (req, res) => {

    res.render('register')

       
 

})



router.get('/addExpense', verifyToken,  (req, res) => {
    const name = req.user.name;
    
    res.render("addExpense", {
        expenses: "",
        name: name
    });
})

router.get('/viewAllExpenses',verifyToken, (req, res) =>{
    const userId = req.user.Id;
    const name = req.user.name;
    try {
        const userId = req.user.Id;
  db.query('SELECT * FROM expenses WHERE user_id = ? ', [userId], (error, expensesResults) => {
      if (error) {
          console.log(error);
          return res.status(500).render('addExpense', {
            message: 'Error retrieving expenses',
            name: name
        });
      } else {
          
        return res.render('addExpense', {
            message: 'Expense Added',
            expenses: expensesResults,
            name: name

          });
      }
          
          
      

        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error')
    }


})


module.exports = router;