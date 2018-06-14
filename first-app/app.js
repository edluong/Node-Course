const http = require('http');

const server = http.createServer((req, res) =>{
    if (req.url == '/'){
        res.write('Hello World');
        res.end();
    }
    
    if(req.url == '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
}); //this is a eventEmitter

//server.on('connection', (socket) => {
//    console.log('New Connection');
//});  //This is usually not done but is just a demonstration that http is a EventEmitter

server.listen(3000);


console.log('Listening on port 3000....');