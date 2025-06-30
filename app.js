const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

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
