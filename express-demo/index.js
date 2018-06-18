const Joi = require('joi'); //this returns a classf
const logger = require('./logger');
const auth = require('./auth');
const express = require('express');
const app = express(); //by convention we use app to denote an express object


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

//express will not automatically parse objects
app.use(express.json()); //adding a piece of middleware
app.use(express.urlencoded({extended:true})); //this will parse incoming url with variable payloads example: key=value&key=value
app.use(express.static('public')); //this will help serve static files such as html/css/static; note public is not in localhost:3000/readme.txt
app.use(logger);

//note middlware functions are called in sequence
app.use(auth);


const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}  
]


//function to validate our course using Joi        
function  validateCourse(course){
     const schema = {
        name: Joi.string().min(3).required()
    }
    
   return Joi.validate(course,schema);
}       


app.get('/',(req, res) => {
    res.send('Hello World');
}); //This is defining a route and the callback function is the route handler

//GET route handler that gets all courses
app.get('/api/courses',(req,res) => {
    res.send(courses);
});

//GET route handler that gets a course by the id
app.get('/api/courses/:id',(req,res) =>{
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.'); //404
    res.send(course);
});

//POST
//insert https://stackoverflow.com/a/18243587
app.post('/api/courses',(req,res) => {
    
    //const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); //using object destructuring (Modern JS); we are only                                            interested in result.error
    if (error) return res.status(400).send(error.details[0].message);//standard convention is to reply with status 400
     
   const course = {
       id: courses.length + 1,
       name: req.body.name
   }; 
    courses.push(course);
    res.send(course); //by convention would need to show this to the client
});

//PUT
//update https://stackoverflow.com/a/18243587
app.put('/api/courses/:id',(req,res) =>{
     const {error} = validateCourse(req.body); //using object destructuring (Modern JS); we are only                                            interested in result.error
    if (error) return res.status(400).send(error.details[0].message);
    //standard convention is to reply with status 400
  
    //look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("course was not found by given ID");
    
    //Validate
    //If invalid, return 400 - Bad request
    if(error) return res.status(400).send(result.error.details[0].message);
    //Update course
    //Return the updated course
    
    course.name = req.body.name;
    res.send(course);
}); 

//DELETE
app.delete('/api/courses/:id',(req,res) =>{
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("course was not found by given ID");
    
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    //return the same course
    res.send(course);
});
     
//PORT
const port = process.env.PORT || 3000; //this is will get us the dynamic port number the host                                                  environment gets use to run it.
app.listen(port,() => console.log(`Listening on port ${port}...`));

