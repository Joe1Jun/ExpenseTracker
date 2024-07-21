// database.js
const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

db.connect((error) => {
    if (error) {
        console.log("Database connection failed:", error);
    } else {
        console.log("MYSQL Connected....");
    }
});

module.exports = db;
