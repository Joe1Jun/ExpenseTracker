// Import the mysql2 library for interacting with MySQL databases
const mysql2 = require("mysql2");
// Import the jsonwebtoken library for creating and verifying JWTs (JSON Web Tokens)
const jwt = require('jsonwebtoken');
// Import the bcryptjs library for hashing and comparing passwords
const bcrypt = require('bcryptjs');
// Import the promisify function from the util module to convert callback-based functions to promise-based
const { promisify } = require('util');

//create connection to database
const db = mysql2.createConnection({
    //access database information from env file
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
     password: process.env.DATABASE_PASSWORD,
     database: process.env.DATABASE
})
// Exporting an asynchronous function named 'register' which handles user registration
exports.register = (req, res) => {
    // Logging the request body to the console for debugging purposes
    console.log(req.body);
     // Destructuring the 'name', 'email', 'password', and 'passwordConfirm' fields from the request body ie. the registration.ejs page
     const { name, email, password, passwordConfirm } = req.body;
    
    
    // Querying the database to check if the email already exists in the 'users' table
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      //console log error if error
      if(error) {
        console.log(error);
      }
        //if the results are greater than user the user email already exists in the database
        if( results.length > 0 ) {
            //renders register page with dynamically inserted message
            return res.render('register', {
                message: 'That email is already in use'
              })
            } 
        //if password and passwordConfirm do not match render register page with message.
        else if( password !== passwordConfirm ) {
            return res.render('register', {
              message: 'Passwords do not match'
            });
          }
        // Hash the user's password with bcrypt
// The bcrypt.hash function takes two arguments:
//  The plain text password that the user provided
// The number of salt rounds to use (a higher number means more hashing rounds and more security, but also more processing time)
// The await keyword is used because bcrypt.hash is an asynchronous function that returns a promise
        
let hashedPassword = await bcrypt.hash(password, 8);
console.log(hashedPassword);

 //insert user information into database.     
db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword }, (error, results) => {
  if(error) {
    console.log(error);
  } else {
    //will render a message dynamically if user is registered
    console.log(results);
    return res.render('register', {
      message: 'User registered'
    });
  }
})


});

}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password ) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/");
      }

    })

  } catch (error) {
    console.log(error);
  }
}




  
  
  

    
  
    
    

    













