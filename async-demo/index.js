//Note: this file is used for understanding asynchronous

//3 ways to deal with asychronous
//Callbacks
//Promises
//async/await


//Asynchronous
console.log('Before');
getUser(2,(user) => {
    //Get the repositories
    getRepositories(user.gitHubUsername,(repos) => {
        console.log('Repos',repos);
        getCommits(repo,(commits) =>{
        });
    });
});
console.log('After');   //structure is known as callback hell or christmas tree problem

//Asynchronous using named functions (to avoid callback hell)
console.log('Before');
getUser(2,getRepos);
console.log('After');  

//one solution is using named functions instead of anonymous functions with callbacks
function getRepositories(user){
    getRepositories(user.gitHubUsername,getCommits);
}

function getCommits(repos){
    getCommits(repo,displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

//callbacks
function getUser(id,callback){
    setTimeout(() => {
        console.log('Reading a user from a database...'); //English: wait 2 seconds (2000 miliseconds) then run function
        callback({id: id, gitHubUsername: 'edge'});
    },2000);
}

function getRepositories(username,callback){
    setTimeout(() => {
        console.log('calling github API...');
        callback(['repo1','repo2','repo3']);
    },2000);
}


/*
    //Synchronous
    console.log('Before');
    const user = getUser(1);
    const repos = getRepositories(user.gitHubUsername);
    const commits = getCommits(repos[0]);
    console.log('After');
*/

