//import express
const express = require('express');
//import path
const path = require('path');
//import mysql2

const mysql2 = require('mysql2')
//import dotenv
const dotenv = require('dotenv');
//express handlebars

//path to dotenv file
dotenv.config({
    path: './.env'
})

//store express as a variable called app
const app = express();

//connect to datebase

const database = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 


})



//store the path to public directory in a variable
//dirname gives you directory you are in and join allows you to join with another folder from that directory
const publicDirectory = path.join(__dirname, '/public');
//make sure express uses this directory
app.use(express.static(publicDirectory));
//import middleware to parse encoded bodies from Html forms
app.use(express.urlencoded({ extended: false }));
//parse JSON bodies as sent by API clients
app.use(express.json());

app.set('view engine', 'ejs');




//connect to database 
database.connect((error) =>{

    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected....")
    }
}
)

app.use('/', require("./routes/pages"));
app.use('/auth', require("./routes/auth"))


app.listen(5002, () => {

    console.log("Server started on port 5002")
})