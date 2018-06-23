const p1 = new Promise((resolve) =>{
    setTimeout(() =>{
        console.log('Async operation 1....');
        //reject(new Error('because something goes wrong'));
        resolve(1);
    },2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() =>{
        console.log('Async operation 2....');
        resolve(2);
    },2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log('Error', error.message));

 Promise.race([p1,p2]) //we use race when we want one of the promises to finish and then we do something  
    .then(result => console.log(result));
    //if one of the promises is rejected then they are all rejected