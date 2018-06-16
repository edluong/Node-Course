const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();


app.use('/',express.static('public'))
app.use('/static',express.static('public'))
app.use(bodyParser);

var vids = [
    { id: 1, "genre": "Action" },
    { id: 2, "genre": "Drama" },
    { id: 3, "genre": "Comedy" }
];

function validateGenre(genreParam){
    const schema = Joi.object().keys({
        genre: Joi.string().min(3).required()
    })
    return Joi.validate({genre: genreParam},schema);
};

app.get('/',(req,res) => {
   //res.send('Welcome to Vidly!'); 
    res.sendFile('/index.html');
});

app.get('/api/genres',(req,res) =>{
    res.send(vids);
});

app.get('/api/genres/:id',(req,res) =>{
    
    //validate if its correct id
    //return 404 if not found
    const genre = vids.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Status:404 Genre is not available for the supplied ID.')
    
    //show the genre
    res.send(genre);
});

//Insert
app.post('/api/genres/',(req,res)=>{
    //validate that the length of the genre is greater than 3
    //console.log(req.body);

    console.log(validateGenre(req.body.genre));
    
    //create the genre object


    //insert into the vids object


    //show the genre inserted
    res.send(res.body.genre);
});


app.listen(3000, () => console.log('Listening on port 3000...'));

