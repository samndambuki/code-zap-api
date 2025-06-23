const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:string,required:true},
    password:{type:string,required:true},
    userid:{type:string,required:true}
});


module.exports = mongoose.model('user',userSchema);
