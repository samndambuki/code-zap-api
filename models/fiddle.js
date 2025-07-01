//ODM for MongoDB and nodejs
//provides schema based solution to model your application data
//stores the entire mongoose library in a constant library mongoose
const mongoose = require('mongoose');
//Schema - constructor/function that defines the structure of documents in a MongoDB collection
//const Schema - creates a shorthand reference to mongoose.Schema
const Schema = mongoose.Schema;

//defines structure of documents that will be stored in the mongodb collection
const fiddleSchema = new Schema({
    //stores actual code content
    //if no code is provided it defaults to an empty string
    code:{type:String,default:''},
    //language - stores the programming language(javascript,python,html) 
    //if no language is provided it defaults to an empty string
    language:{type:String,default:''},
    //store the name or title of the fiddle
    //Date.now() - returns the current timestamp in milliseconds
    name:{type:String,default:'Untitled Fiddle' + Date.now()},
    //unique identifier for the fiddle
    //the field must be provided before creating a document
    fiddleid:{type:String,required:true},
    //links the fiddle to the user who created it
    userid:{type:String,required:true}
})

//create a model from a schema
//model - contructor function that creates and manages docuemnts in a mongoDB
//fiddle - name of the model
//fiddleSchema - schema definition we created earlier
//module.exports - makes the model available to other files in your application
module.exports = mongoose.model('fiddle',fiddleSchema);