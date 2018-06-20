const express = require('express');
const router = express.Router();
const Joi = require('joi');


//vids held in memory
var vids = [
    { id: 1, "genre": "Action" },
    { id: 2, "genre": "Drama" },
    { id: 3, "genre": "Comedy" }
];

//helper function to help validate that if the genre is of the correct schema using Joi
function validateGenre(genreParam){
    const schema ={
        genre: Joi.string().min(3).required()
    }
    return Joi.validate(genreParam,schema);
};


router.get('/',(req,res) =>{
    res.send(vids);
});

router.get('/:id',(req,res) =>{
    
    //validate if its correct id
    //return 404 if not found
    const genre = vids.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Status:404 Genre is not available for the supplied ID.');
    
    //show the genre
    res.send(genre);
});

//Insert
router.post('/',(req,res)=>{
    //validate that the length of the genre is greater than 3
    //console.log(req.body.genre);
    var {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //create the genre object
    var genre = {
        id: vids.length + 1,
        genre: req.body.genre
    }
    //insert into the vids object
    vids.push(genre);

    //show the genre inserted
    res.send(genre);
    //console.log(vids);
});

router.put('/:id',(req,res) =>{

    //validate that the new update will be greater than 3
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //look up the genre, send 404 if not found
    var genreLookup = vids.find(g => g.id === parseInt(req.params.id));
    if(!genreLookup) return res.status(404).send('Status:404 Genre is not available for the supplied ID.');

    //update the genre
    genreLookup.genre = req.body.genre; 
    
    //send the updated genre to the client
    res.send(genreLookup);
});

//delete
router.delete('/:id',(req,res) => {

    //check if the given id is there
    //if its not found give a status 400
    const genre = vids.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send("cannot find supplied ID.");

    //remove genre from the vids array
    vids.splice(vids.indexOf(genre),1);

    //show the removed genre 
    res.send(genre);
});

module.exports = router;