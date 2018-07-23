var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:Reload10@ds245971.mlab.com:45971/todo-saboya')

//Create a Schema
var todoSchema = new mongoose.Schema({
    tarea: String
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema);

//Insertar registro
// var tarea1 = Todo({tarea: 'get rekt'}).save(function(err) {
//     if (err) throw err;
//     console.log('tarea guardada');
// });

// var data = [{tarea: 'get milk'},{tarea: 'walk dog'},{tarea: 'code something cool'}];
var urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });  
    });
    app.post('/todo', urlencodeParser, function(req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        
    });
    app.delete('/todo/:tarea', function(req, res) {
        //delete requested item from mongoDB
        Todo.find({tarea: req.params.tarea.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        
    });

};