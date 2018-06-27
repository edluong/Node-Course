const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') //hardcoding the connection string for now; should be inside a config file
    .then( () => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

//create a schema
const courseSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category:{
        type: String,
        //required: true,
        enum: ['web','mobile','network','test'],
        
        //Extra properties for string type
        //lowercase: true //converts it automatically to lowercase
        uppercase: true,
        trim: true //helps remove any type of padding 
    },
    author: String,
    tags: {
            type: Array,
            validate:{
                isAsync: true,
                validator: function(v,callback){
                    setTimeout(() =>{
                      //Do some async work
                        const result = v && v.length > 0; //the v part is to see if its not null
                        callback(result);
                    },4000);
                },
                message: 'A course must have at least one tag...'
            }
         },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.isPublished;}, //conditional required;useful for certain scenarios
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

//Classes, objects
//Course, nodeCourse

//create a Class
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
//create an object
const course = new Course({
    name: 'Angular Course',
    //category: 'TEST',
    author: 'Ed',
    tags: ['angular','frontend'],
    isPublished: true,
    price: 15.8
});

    try{
        const result = await course.save(); //async operation
        console.log(result);

        // await course.validate(); does the same thing as the line above
    }
    catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
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
//getCourses();

async function updateCourse(id){ //query first approach

    //Approach: query first
    //findbyID()
    //modify its properties
    //save()

    const course = await Course.findById(id);

    if(!course) return;

    //1st approach
    course.isPublished = true;
    course.author = 'Another Author';

    //save the result so we can display it
    const result = await course.save();
    console.log(result);
}

async function updateMethodCourse(id){ //update first technique
    //Approach: update first
    //update directly
    //optionally get the updated document

    //Course.update({isPublished: false}) //English update not published courses
    const result = await Course.update({_id: id},{
        $set: {
            author: 'Ed',
            isPublished: false
        }
    });
    console.log(result);
}

async function updateMethodCourseDoc(id){
    const result = await Course.findByIdAndUpdate(id,{
        $set:{
            author: 'Jason',
            isPublished: false
        }
    },{new: true}) //need to pass another property {new: true} to return the updated document
    console.log(result); //returns before the document that was updated
}

async function removeCourse(id){
    const result = await Course.deleteOne({_id: id});
    console.log(result);
    //Course.deleteOne({isPublished:true}) //this will delete the first published document
    //Course.deleteMany({_id: id}) //deletes many documents
    //Course.findByIdAndRemove(id) //returns back the removed document
}
 
//removeCourse('5b2fc40468bfaf24a8a942e8');
createCourse();



