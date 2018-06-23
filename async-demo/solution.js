
//rewrite into Promise -- DONE
//write the top part as await/sync style

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendEmailtoCustomer(id){
  try{
      const customer = await getCustomer(1);
    console.log('Customer: ',customer);
    if(customer.isGold){
      const movies = await getTopMovies();
      console.log('Top movies:', movies);
      await sendEmail(customer.email,movies);
      console.log('Email sent...');
    }
  }
  catch(err){
    console.log('Error:',err);
  }
}

sendEmailtoCustomer(1);

//turned into a promise
function getCustomer(id) {
  return new Promise((resolve,reject) =>{
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Ed Luong', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  });
}

//turned into a promise
function getTopMovies() {
  return new Promise((resolve,reject) =>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve,reject) =>{
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}