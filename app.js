const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios').default;

const userRoute = require('./routes/user');
const fiddleRoute = require('./routes/fiddle')

const app = express();
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello from server')
});

app.use('/users',userRoute)

app.use('/fiddles',fiddleRoute)

app.post('/execute',(req,res)=>{
    let reqObj = req.body;
    reqObj['clientId'] = "2669433e432c3100325cfa88e3a1c766"
    reqObj["clientSecret"] = "f2b266e0384a9b3990e55d870c291b4c33f007a5720ab789d02aff054cc938ca"
    axios.post('https://api.jdoodle.com/v1/execute',reqObj).then((resp)=>{
        res.status(200).json({error:false,response:resp})
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({error:true,response:error})
    })
})

mongoose.connect('mongodb+srv://codezap:samndambuki@cluster0.m8hcorh.mongodb.net/codezap?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
   console.log('connected to db')
}
).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
