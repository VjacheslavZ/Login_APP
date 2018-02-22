var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    logger = require('morgan'),
    port = 8080,
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/myApp', {})
    .then(() => console.log('MongoDB started'))
    .catch( e => console.log('mongoDB error' + e));

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function (req, res) {
    res.send("users");
});

// include routes
var routes = require('./routes/router');
app.use('/', routes);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
    console.log("API app started on port " + port)
});

module.exports = app;



// require('./person.model');


// var users = [
//     {
//         id: "x",
//         name: "1",
//         password: "2",
//         confirmPassword: "3",
//         email: "4"
//     },
//     {
//         name: "11",
//         password: "22",
//         confirmPassword: "33",
//         mail: "44"
//     }
// ];

// app.post('/register', function (req, res) {
//
//     if(!req.body) return res.sendStatus(400);
//
//
//     var newUersData = {
//         userName: req.body.userName,
//         userPassword: req.body.userPassword,
//         confirmPassword: req.body.confirmPassword,
//         userEmail: req.body.userEmail,
//     };
//
//     // users.push(newUersData);
//     res.send(newUersData);
//
//     console.log(newUersData);
//     // res.json(req.body);
// });

//const Person = mongoose.model('persons');

// const person = new Person({
//     name: 'first user',
//     age: 37,
//     phones: ['0662103170', '088000000']
// });

// person.save()
//     .then( user => console.log(user) )
//     .catch( e => console.log(e) );

/*сортировка по заданному условию*/
// Person
//     .find({name: {'$in':['person1','person2','person3']}})
//     .limit(2)
//     .sort('-age')
//     .then(persons => console.log( JSON.stringify(persons, null, 2) ))
//     .catch(e => console.log(e));

// Person.find({name: 'person1', /*другие условия*/})
//     .then(persons => console.log( JSON.stringify(persons, null, 2) ))
//     .catch(e => console.log(e));

/*удаление модели*/
// Person
//     .find({age: 37})
//     .limit(2)
//     .then(persons => {
//         const p = persons[0];
//         /*удаление*/
//         //Person.find({_id: p._id}).remove().then(_ => console.log("removed"));
//     })
//     .catch(e => console.log(e));


//пишим в бд новых пользователей
// [{name: 'person1', age: 55},
// {name: 'person2', age: 70},
// {name: 'person3', age: 30}]
// .forEach(p => {
//    new Person(p).save()
// });




