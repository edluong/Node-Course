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
router.get('/:id', async (req,res) =>{

    //in mongoose find the customer by the id
    const customer = await Customer.findById(req.params.id);
    //return a response of 404 if not found
    if(!customer) return res.status(404).send('Customer was not found by the supplied ID.');
    //send the response
    res.send(customer);
});

//post a customer into the DB
router.post('/', async (req,res) =>{
    //validate the req from the body first using Joi and get the error
    var {error} = validateCustomers(req.body);
    
    //if there is a problem with the customer then send a response of 400 bad request
    if(error) return res.status(400).send(error.details[0].message);
    
    //if there is no problem found, continue and create a new document from the body of the request
    let customer = new Customer(
        {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }
    )

    //try to insert the document into the DB
    try{
        customer = await customer.save();
        res.send(customer);
    }
    catch(err){
        for(field in err.errors){
            console.log(err.errors[field].message);
        }
    }
});


//update
router.put('/:id',(req,res) => {

});


//delete
router.delete('/:id',(req,res) => {

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

module.exports = router;

