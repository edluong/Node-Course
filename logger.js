var url = 'http://mylogger.io/log';

function log(message){
    //SEND an http request
    console.log(message);
}

console.log(__filename); //complete path to the filename
console.log(__dirname); //path where it contains the module


//This is so that we can export variables so other modules can access
module.exports.log = log; //This is exporting a single object

//There will be scenarios where you want to export a single function
//This can be done by doing module.exports = log //Essentially exporting the function only
