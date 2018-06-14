/*
--From previous Lec--
var url = 'http://mylogger.io/log';

function log(message){
    //send an HTTP request
    console.log(message);
}

module.exports.log = log;
module.exports.url = url;*/

const EventEmitter = require('events');
//const emitter = new EventEmitter(); //can remove this now because we do not use it

var url = 'http://mylogger.io/log';


class Logger extends EventEmitter{
    
    log(message){
    //send a HTTP request
    console.log(message);
    
    //Raise an event
        this.emit('messageLogged', {id: 1, url: 'http://'}); //have "this" class emit
    } 
}


module.exports = Logger;
