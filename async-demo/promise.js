//Promise is an async operation that will resolve or fullfilled. If there is something wrong then reject
const p = new Promise((resolve,reject) => {
    //kick off some async work
    //...
    setTimeout(() => {
        //resolve(1);  //pending => resolved, fulfilled
         reject(new Error('message')); //best practice is to pass an error object
    }, 2000);
});

p.then(result => console.log('Result',result)).catch(err => console.log('Error',err.message));