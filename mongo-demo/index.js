const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') //hardcoding the connection string for now; should be inside a config file
    .then( () => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

//create a schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

//Classes, objects
//Course, nodeCourse

//create a Class
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
//create an object
const course = new Course({
    name: 'Angular Course',
    author: 'Ed',
    tags: ['angular','frontend'],
    isPublished: true
});

const result = await course.save(); //async operation
console.log(result);
}


// //Comparison operator example
// async function getCourses(){
//     //comparison operators 
//     //eq (equal)
//     //ne (not equal)
//     //gt (greater than)
//     //gte (greater than or equal to)
//     //lt (less than)
//     //lte (less than or equal to)
//     //in
//     //nin (not in)

//     const courses = await Course
//     //.find({author: 'Ed',isPublished: true})
//     //.find({price: {$gt: 10} } )  //English: Find courses that the price is greater than 10
//     //.find({price: {$gte: 10, $lte: 20}}) //English: find courses that had the price that is >$10 and <$20
//     .find({price:{$in:[10,15,20]}}) //English: find courses that are $10, $15, $20
//     .limit(10) //top 10
//     .sort({name: 1}) //sort by ascending order; use -1 for descending order
//     .select({name: 1, tags: 1}); //nomal select statement
//     console.log(courses);
// }



// //logical operator example
// async function getCourses(){
//     //and
//     //or

//     const courses = await Course
//     //.find({author: 'Ed',isPublished: true})
//     .find()
//     .or([{author: 'Ed'},{isPublished: true}]) //find courses that the author is Ed or the course is published
//     //.and([])
//     .limit(10) //top 10
//     .sort({name: 1}) //sort by ascending order
//     .select({name: 1, tags: 1}); //nomal select statement
   
//     console.log(courses);
// }

// //Regular expression
// async function getCourses(){
//     const courses = await Course
//     //.find({author: 'Ed', isPublished: true}) //this is looking for EXACT author that is Ed

//     //looks for authors that begin with 'Ed'
//     .find({author: /^Ed/}) // /pattern/ - denotes a beginning of a regular expression; ^ means starts with

//     //Ends with Luong

//     .find({author:/Luong$/i}) //the pattern for end with is $; QUERY currently is case sensitive; appending i to make it insensitive
   
//     //Look for authors that begin with authors that contain 'Ed'
//     .find({author:/.*Ed*./i})
   
//     .limit(10)
//     .sort({name: 1})
//     .select({name:1, tags:1});

//     console.log(courses);
// }

//get the Count of courses
async function getCourses(){
    const courses = await Course
    .find({author:'Ed',isPublished: true})
    .limit(10)
    .sort({name: 1})
    .count();
    
    console.log(courses);
}

//pagination example
async function getCourses(){

    const pageNumber = 2;
    const pageSize = 10;
    //Real world example: /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
    .find({author:'Ed',isPublished: true})
    .skip((pageNumber - 1) * pageSize) //formula to determine which page number we are on; assuming pageNumber begins at 1
    .limit(pageSize)
    .sort({name: 1})
    .count();
    
    console.log(courses);
}



//createCourse();
getCourses();

