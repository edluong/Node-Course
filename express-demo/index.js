const Joi = require('joi'); //this returns a classf
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const debug = require('debug')('app:startup');//this function returns a namespace
const auth = require('./auth');
const config = require('config');
const express = require('express');
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');
const app = express(); //by convention we use app to denote an express object

app.set('view engine', 'pug');
//optional setting to change the default
app.set('views','./views');

/* console.log(`Node_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`); //express's way of telling you which environment */

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));


//app.get() 2 Params: 1st Param is url of the api, callback function
//app.post()
//app.put()
//app.get()

/*app.get('/api/courses/:year/:month',(req,res) =>{
    res.send(req.params);//using params would get all of the params (would be called route parameters)
})*/

/*
app.get('/api/courses/:year/:month',(req,res) =>{
    res.send(req.query);//use req.query to get calls that use the ? (query string parameter)
});
*/
app.use(helmet()); //by convetion helmet should always be first middleware
//only run Morgan middlware if the production is development
if(app.get('env') === 'development'){
    app.use(morgan('tiny')); //this is middleware to log it in the console; you might only want this to be turned on certain situations
    debug('Morgan enabled...'); //Prefer the debug statements compared to console.log; gives more power
}
app.use('/',homepage);
app.use('/api/courses',courses); //for any routes that start with api/courses use this router
app.use(express.json()); //adding a piece of middleware //express will not automatically parse objects
app.use(express.urlencoded({extended:true})); //this will parse incoming url with variable payloads example: key=value&key=value
app.use(express.static('public')); //this will help serve static files such as html/css/static; note public is not in localhost:3000/readme.txt
app.use(logger);
//note middlware functions are called in sequence
app.use(auth);

//DB work...
//dbDebugger('Connected to the database...');

//PORT
const port = process.env.PORT || 3000; //this is will get us the dynamic port number the host                                                  environment gets use to run it.
app.listen(port,() => console.log(`Listening on port ${port}...`));

