const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises'); //Note double check the db name, if its not right an empty array will be returned

//create the schema
const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

//create an object of the class (model)

const Course = mongoose.model('Course',courseSchema);

async function getCourses(){
    return await Course
    .find({ isPublished: true})
    .or([
        {price: {$gte: 15}},
        {name:/ .*by*. /i }
    ]) //Note: the or query needs an ARRAY of conditions
    .sort('-price')
    .select('name author price');
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();


