//creating a promise that is already resolve

const p = Promise.resolve({id: 1});
p.then(result => console.log(result));

//creating a promise that is already rejected
//this would be good during testing
const p2 = Promise.reject( new Error('reason for rejection...'));
p2.catch(error => console.log(error));
