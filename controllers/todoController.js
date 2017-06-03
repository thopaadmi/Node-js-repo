var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//connect to the database

mongoose.connect('mongodb://test:test@ds157499.mlab.com:57499/todo_shravan');

//create a schema . this is like a blue print for our data

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo',todoSchema);

//var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//  if(err) throw err;
//  console.log('Item saved');
//})

//var data = [{item : 'get milk'},{item : 'go running'},{item: 'stay happy'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo',function(req,res){

    //res.render('todo',{todos : data });

    // now connect and get data from mongoose
    Todo.find({},function(err, data){
      if (err) throw err;
      res.render('todo',{todos: data});
      // now the data is coming from the call back function's parameter which inturn gets
      // the data from the Todo.find({})
    })
});

app.post('/todo', urlencodedParser ,function(req,res){
// get data from the view and add it to mongodb

var newTodo = Todo(req.body).save(function(err,data){
  if (err) throw err;
  res.json(data);
});
//data.push(req.body);
//res.json(data);
});

app.delete('/todo/:item',function(req,res){

  // delete items from mongoose
  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  })
 /*data = data.filter(function(todo){
   return todo.item.replace(/ /g,'-') !== req.params.item;
});
 res.json(data);
*/
});

};
