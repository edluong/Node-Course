function auth (req,res,next){
    console.log('Authenticating...');
    next();  //calling the next middleware function. NOTE: if we do not have this function, the request will hang
}

module.exports = auth;