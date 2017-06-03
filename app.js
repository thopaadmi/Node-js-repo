var express = require('express');
var app = express();

var todocontroller = require('./controllers/todoController');

// set up template engine
app.set('view engine','ejs');

//static files

app.use(express.static('./public'));

//fires controllers
todocontroller(app);

//listens to port
app.listen(3000);
console.log('You are listening to port 3000');
// to run it, go to the folder and  type
//node app.js
// Open the browser and type localhost:3000/todo
