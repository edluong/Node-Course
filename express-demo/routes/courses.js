const express = require('express');
const router = express.Router();

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
//GET route handler that gets all courses
router.get('/',(req,res) => {
    res.send(courses);
});

//GET route handler that gets a course by the id
router.get('/:id',(req,res) =>{
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.'); //404
    res.send(course);
});

//POST
//insert https://stackoverflow.com/a/18243587
router.post('/',(req,res) => {
    
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
router.put('/:id',(req,res) =>{
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
router.delete('/:id',(req,res) =>{
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

module.exports = router; 