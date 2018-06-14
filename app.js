//*best practice* when loading a module use const; DO NOT want to override the value
//every module has a module wrapper function: this simply means every module is ran through a function
const logger = require('./logger');//this is native to Node; not found in browsers

logger.log('message');

if (process.platform == 'win32'){
    console.log('Nice! A Windows User!');
}
else{
    console.log('Bummer...not a Windows user....')
}

