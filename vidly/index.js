const express = require('express');
const app = express();
const genreRoute = require('./routes/genre.js');

//middleware
app.use(express.json()); //we have to do this to make genre.js run for the routes
app.use('/api/genres',genreRoute);
app.use('/',express.static('public'));
app.use('/static',express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

