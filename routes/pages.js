const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const db = require("../database");
const verifyToken = require('../middleware/auth');

router.get('/', (req, res) => {

    res.render('index');
})

router.get('/login', (req, res) => {

    res.render('login');
})

router.get('/register', (req, res) => {

    res.render('register')

       
 

})

router.get('/addExpense',  (req, res) => {
    
    
    res.render("addExpense", {
        expenses: ""
    });
})

router.get('/viewAllExpenses',verifyToken, (req, res) =>{
    const userId = req.user.Id;
    
    try {
        const userId = req.user.Id;
  db.query('SELECT * FROM expenses WHERE user_id = ? ', [userId], (error, expensesResults) => {
      if (error) {
          console.log(error);
      } else {
          
        return res.render('addExpense', {
            message: 'Expense Added',
            expenses: expensesResults
          });
      }
          
          
      

        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error')
    }


})


module.exports = router;