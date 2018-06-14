/*
--Lec 19 Events Module--
const EventEmitter = require('events'); //this is usually to specifiy a class with capital letters
                                        //classes are containers contains properties and functions
                                        //class is a blueprint while an object is an actual thing of the class; Example: class is to human as object is to John
const emitter = new EventEmitter();

//Register a listener

emitter.on('messageLogged',function(){
   console.log('Listener logged'); 
});


//Raise an event
emitter.emit('messageLogged');

--Lec 20 Events Arguments--

*/

//The structure of .on() -- 1st parameter is the "name" of the event we're listening to
//                       -- 2nd parameter is the function that will be called when we find the event                         

const EventEmitter = require('events'); //this is usually to specifiy a class with capital letters
                                        //classes are containers contains properties and functions
                                        //class is a blueprint while an object is an actual thing of the class; Example: class is to human as object is to John
//const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();

//Register a listener

//In ES6 it is possible to get rid of function keyword and replace it with =>
logger.on('messageLogged',(arg) => { //arg is usually by convention but some people would refer to e (event) or eventArg
   console.log('Listener called',arg); 
});

logger.log('message');

/*emitter.on('logging',(arg) =>{
    console.log('Listener logged',arg);
})*/


//Raise: logging (data: message)
//emitter.emit('logging',{data: 'message'});

//Raise an event
//emitter.emit('messageLogged', {id: 1, url: 'http://'}); //can add in an object called events arguments


//Testing the max limit of on which is 10. Will need to use setMaxListeners to increase
//
//emitter.setMaxListeners(21);
//
//emitter.on('logging',()=>{console.log("event 2")});
//emitter.on('logging',()=>{console.log("event 3")});
//emitter.on('logging',()=>{console.log("event 4")});
//emitter.on('logging',()=>{console.log("event 5")});
//emitter.on('logging',()=>{console.log("event 6")});
//emitter.on('logging',()=>{console.log("event 7")});
//emitter.on('logging',()=>{console.log("event 8")});
//emitter.on('logging',()=>{console.log("event 9")});
//emitter.on('logging',()=>{console.log("event 10")});
//emitter.on('logging',()=>{console.log("event 11")});
//emitter.on('logging',()=>{console.log("event 12")});













