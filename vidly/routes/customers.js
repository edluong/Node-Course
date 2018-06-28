const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: {
        type: String, 
        required: true,
        trim: true, 
        minlength: 2,
        maxlength: 50
     },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not a valid phone number'
            }
        }
});

//create a model from the schema
const Customer = mongoose.model('Customer',customerSchema);


//get all customers
router.get('/', async (req,res) => {
    const customer = await Customer.find().sort("name");
    res.send(customer);
});

//get customer by id
router.get('/:id', (req,res) =>{

    //using Joi, validate the input from the body
  

    //in mongoose find the customer by the id
    //return a response of 404 if not found

    //send the response
});

//post a customer into the DB
router.post('/',(req,res) =>{
    //validate the req from the body first using Joi


});

//validation function to check the input from the body
function validateCustomers(customer){
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(2).max(50),
        phone: Joi.number().integer().positive()
    }
    return Joi.validate(customer, schema);
}



