//import express
const express = require('express');
//import path
const path = require('path');

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// Import the database connection
const db = require('./database');
//path to dotenv file
dotenv.config({
    path: './.env'
})

//store express as a variable called app
const app = express();

//store the path to public directory in a variable
//dirname gives you directory you are in and join allows you to join with another folder from that directory
const publicDirectory = path.join(__dirname, '/public');
//make sure express uses this directory
app.use(express.static(publicDirectory));
//import middleware to parse encoded bodies from Html forms
app.use(express.urlencoded({ extended: false }));
//parse JSON bodies as sent by API clients
app.use(express.json());

// Parse cookies
app.use(cookieParser()); 

//set view engine
app.set('view engine', 'ejs');


//define routes
app.use('/', require("./routes/pages"));
app.use('/auth', require("./routes/auth"))

//start server
app.listen(5002, () => {

    console.log("Server started on port 5002")
})