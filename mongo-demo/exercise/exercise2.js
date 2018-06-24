const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

//create the schema
const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

//create the model
const Course = mongoose.model('Course', courseSchema);

//start the query

async function getCourses(){
    return await Course
    .find({
        isPublished:true,
        tags: {$in:['frontend','backend']} //the reason ['frontend','backend'] will not work because the logical AND operator will apply
    })
    .sort({price: -1}) //.sort('-price') is also acceptable
    .select('name author price') //.select('name author') is also acceptable
}

//alternative solution; using the or operator for tags
/* async function getCourses(){
    return await Course
    .find({
        isPublished:true
    })
    .or([{tags: 'frontend'},{tags:'backend'}])
    .sort({price: -1}) //.sort('-price') is also acceptable
    .select('name author price') //.select('name author') is also acceptable
}
 */
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();
 
