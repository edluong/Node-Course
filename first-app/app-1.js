/*
--Notes--
-Useful modules-
File System
HTTP
OS
Path
Process
Query Strings
Stream


Module Wrapper Function
__dirname
__filename
exports

function (exports, require, module, __filename, __dirname) 


create a file called ".jshintrc" and enter in a line {"esverison": 6} to not have the jshint complain


console.log(module); --check a module settings

--Global functions--
.log()
setTimeout()
clearTimeout();
setInterval()
clearInterval()

When creating a variable, it will not automatically become a global variable
variables are scoped in the file it is created

a file is essentially a module
variables created inside a module is only scoped in that module
every file has a main module
*/

const logger = require('./logger');

function sayHello(name){
    console.log('Hello ' + name);
}

console.log(logger);

sayHello('Ed');





