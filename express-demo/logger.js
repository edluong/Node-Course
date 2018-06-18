//usually you do not write all of the middleware logic inside the index.js
function log(req,res,next){
    console.log('Logging...');
    next();  //calling the next middleware function. NOTE: if we do not have this function, the request will hang
};

module.exports= log;