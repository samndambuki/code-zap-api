const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello from server')
});

app.use('/users',userRoute)

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
