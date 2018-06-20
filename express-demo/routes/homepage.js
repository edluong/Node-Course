const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    //res.send('Hello World');
    res.render('index',{title:'My Express App',message: 'Hello'}); //rendering templates using express
}); //This is defining a route and the callback function is the route handler

module.exports = router;
