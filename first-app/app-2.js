/*
--Notes--
Node looks for path where the built in modules are, if none found it will look for the relative path of where this file is located

--Lec 16 Path module --

const path = require('path');


var pathObj = path.parse(__filename); //__filename is from the module wrapper function from

--Lec 17 Os module --

const os = require('os');

var totalMemory = os.totalmem()
var freeMemory = os.freemem()


console.log('Total Memory: ' + totalMemory);

//Template string
// ES6 / ES2015 : ECMAScript 6
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

var name = 'Ed';
console.log(`Hello  ${name}`);

--Lec 18 File system --
In real world applications; should most of the time use ASYNCHRONOUS functions (without the SYNC at the end)
*/
//
const fs = require('fs');

const files = fs.readdirSync('./');
console.log(files);   //this will return all of the files in this folder
             
            
fs.readdir('$',function(err,files){
   if(err) console.log('Error',err);
    else console.log('Result',files);
});


