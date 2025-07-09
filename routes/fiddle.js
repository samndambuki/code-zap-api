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
const fiddle = require('../models/fiddle');


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
    //findOne - to search database
    //looks for a single document where the fiddleid matches the req.params.fiddleid
    //req.params.fiddleid extracts the fiddleid parameter from /fiddles/abc123   
    fiddleModel.findOne({fiddleid:req.params.fiddleid})
    //handles a successful case when the database query completes
    //doc contains the found document
    .then((doc)=>{
        //sends a json response 
        //error:false - indicates no error occured
        //response:doc - actual fiddle data found
        if(!doc){
            return res.status(404).json({error:true,message:'fiddle not found'})
        }
        res.status(200).json({error:false,response:doc})
    })
    //handle any errors that occur during the database operation
    .catch((error)=>{
        //logs the error to the console
        console.log(error);
        res.status(500).json({error:true,message:"database error"});
    })
})

/*
/fiddles/user/user123
*/
//req.params.userid user123
router.get('/user/:userid',(req,res)=>{
    //finds all fiddles that belong to a specific user
    fiddleModel.find({userid:req.params.userid}).then((docs)=>{
        if(!docs){
            return res.status(404).json({error:false,message:'no fiddles found'})
        }
        res.status(200).json({error:false,response:docs})
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({error:true,message:'database error'})
    })
})

//post endpoint at root path /fiddles
//POST - create new resources
//(req,res) - callback function
router.post('/',(req,res)=>{
    //req.body contains all request data(code,name,language,fiddleid,userid)
    //get json data sent by the client
    const fiddleObj = req.body;
    if(typeof fiddleObj !=='object' || !fiddleObj.userid){
        return res.status(400).json({error:true,message:'invalid request body:userid required'})
    }
    //add a unique identifier to fiddle object
    //uuidv4 - generates random uuid
    //each fiddle has a unique id
    fiddleObj['fiddleid'] = uuidv4();
    //creates a new mongoose document instance from fiddle object
    let newFiddle = new fiddleModel(fiddleObj)
    newFiddle.save().then((doc)=>{
          if(!doc){
            return res.status(404).json({error:true,message:'fiddle not found'})
          }
          res.status(200).json({error:false,response:doc})
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({error:true,message:'database error'})
    })
})


// / - root path
router.put('/',(req,res)=>{
    const {fiddleid,name,code,language,userid} = req.body;
    if(!fiddleid){
        res.status(400).json({error:true,message:'fiddleid is required'})
    }
    //update document in mongodb
    fiddleModel.updateOne(
        //find document by fiddleid
        {fiddleid},
        //set new values
        {$set:{name,code,language,userid}},
        //enforce schema validation during update
        {runValidators:true}
    ).then((result)=>{
        //macthed count tells how many documents matched the fiddleid
        if(result.matchedCount === 0 ){
            return res.status(404).json({error:true,message:'fiddle not found'})
        }
        return fiddleModel.findOne({fiddleid}).then((doc)=>{
            res.status(200).json({error:false,response:doc})
        })
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({error:true,message:'database error'})
    })
})

router.delete('/:fiddleid',(req,res)=>{
    fiddleModel.deleteOne({fiddleid:req.params.fiddleid})
    //then - handles successful deletion
    // _ - result is ignored
    .then((_)=>{
        res.status(200).json({error:false,message:'fiddle deleted'})
    }).catch((error)=>{
        res.status(500).json({error:true,message:'database error'})
    })
})


module.exports = router;