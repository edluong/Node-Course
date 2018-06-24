const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect to the mongoose database
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected to mongodb'))
    .catch( err => console.error('Error with connecting to mongodb...',err));

//create a schema
const courseSchema = new Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    tags: [String],
    date: Date
});

//create a model from the schema
const Course = mongoose.model('Course',courseSchema);

//using the model, query off of the model
async function getCourses(){
    return await Course
    .find({
        isPublished: true,
        tags: 'backend'
    })
    .sort({name: 1})
    .select({name: 1,author: 1 })
     //.count();
    
     console.log(courses);
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();