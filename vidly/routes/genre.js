const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');


//create the Schema to be used
const genreSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim:true, 
        minlength: 3,
        required: true
        },
    date: {type: Date, default: Date.now }
});

//created an object to start using Database actions on it
const Genre =  mongoose.model('genre',genreSchema);


//helper function to help validate that if the genre is of the correct schema using Joi
function validateGenre(genreParam){
    const schema ={
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genreParam,schema);
};

router.get('/', async (req,res) =>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req,res) =>{
    
    const genre = await Genre.findById(req.params.id);
    //return 404 if not found
    //const genre = vids.find(g => g.id === parseInt(req.params.id));
   
    if (!genre) return res.status(404).send('Status:404 Genre is not available for the supplied ID.');
    
    //show the genre
    res.send(genre);
});


//Insert
router.post('/', async (req,res)=>{
    //validate that the length of the genre is greater than 3
    var {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //create a new document using new Model
    let genre = new Genre({ name: req.body.name});

    try{
        genre = await genre.save(); 
        res.send(genre);
    }
    catch(err){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }
});

//update
router.put('/:id', async (req,res) =>{

      //validate that the new update will be greater than 3
      const {error} = validateGenre(req.body);
      if (error) return res.status(400).send(error.details[0].message);
    
    //look up the genre, send 404 if not found
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.genre, new: true});
    if(!genre) return res.status(404).send('Status:404 Genre is not available for the supplied ID.');
    
    //send the updated genre to the client
    res.send(genre);
});

//delete
router.delete('/:id',async (req,res) => {

    const genre =  await Genre.findByIdAndRemove(req.params.id);
    
    //check if the given id is there
    //if its not found give a status 400
    if (!genre) return res.status(400).send("cannot find supplied ID.");

    //show the removed genre 
    res.send(genre);
});

module.exports = router;




//  //Rewrote this so that it can be stored in the database (from the above array)

//  async function createGenre(g){
//     const genre = new Genre({
//         name: g
//     })
//     try{
//         const result = await genre.save();
//         console.log(result);
//     }
//     catch(err){
//         for (field in ex.errors)
//             console.log(ex.errors[field].message);
//     }
// }

// // createGenre('Action');
// // createGenre('Drama');
// // createGenre('Comedy');
