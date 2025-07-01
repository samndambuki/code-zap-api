//express - web application framework for node.js
const express = require('express');
//create a new express router instance
//routers allow you organize routes in separate files instead of putting everything in app.js
const router = express.Router();
//imports user model from the models directory
//../models/user - go one level up the directory and import the user file
//gives access to mongoose model to perform database operations
// const userModel = require('../models/user');
const fiddleModel = require('../models/fiddle');
//import crypto-js library for Cryptographic functions
//crypto-js provides encryption,decryption and hashing capabilities
// const CryptoJs = require('crypto-js');
//import the universally unique identifier(uuid)
//{v4:uuidv4} - destructuring. import v4 function and rename it to uuidv4
//uuid - generates unique ids
//commonly used for :
//user IDs , session tokens, unique identifiers for any resource
const {v4:uuidv4} = require('uuid');


// endpoints 
/*
fiddles/:fiddleid - GET
fiddles/user/:userid - GET
fiddles/ - POST
fiddles/ - PUT
fiddles/ - DELETE
*/

//http method
//use the express router instance not the main app
//'/:fiddleid' - route path with parameter
// / path "fiddleid" - parameter
//: - tells express that fiddleid is a variable 
//route handler
//(req,res)=>{} - callback function which executes once this route is matched
//req - contains info about the request
//res - contains info about the response
router.get('/:fiddleid',(req,res)=>{
    fiddleModel.findOne({fiddleid:req.params.fiddleid}).then()
})
