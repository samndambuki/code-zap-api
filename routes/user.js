const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const CryptoJs = require('crypto-js');
const {v4:uuidv4} = require('uuid');

router.get('/',(req,res)=>{
    res.send('user route');
})

//login
//create account

router.post('/',(req,res)=>{
    let userObj = req.body;
    userObj.password = CryptoJS.AES.encrypt(userObj.password,'1234567').toString();
    userObj['userid'] = uuidv4();
    let newUser = new userModel(userObj);
    newUser.save().then((doc)=>{
        res.json({error:false,response:doc});
    }).catch((err)=>{
        console.log(err);
        res.json({error:'true',message:'error in creating doc'});
    });
})

router.post('/login',(req,res)=>{
    let data = req.body;
    userModel.findOne({
        email:data.email
    }).then((userDoc)=>{
        if(userDoc==null){
            res.json({error:true,message:"account does not exist"})
        }else{
            let decryptedPassword = CryptoJs.AES.decrypt(userDoc.password,'1234567').toString(CryptoJS.enc.Utf8);
            if(decryptedPassword == data.password){
                res.json({error:false,response:userDoc});
            }else{
                res.json({error:true,message:"incorrect password"});
            }
        }
    }).catch();
})

module.exports = router;