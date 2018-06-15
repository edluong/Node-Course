const express = require('express');
const app = express();

app.use('/',express.static('public'))
app.use('/static',express.static('public'))

var vids = [
    { id: 1, "genre": "Action" },
    { id: 2, "genre": "Drama" },
    { id: 3, "genre": "Comedy" }
];

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

app.listen(3000, () => console.log('Listening on port 3000...'));

