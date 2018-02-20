var express = require('express');
var app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    index = require('./routes/index'),
    port = 8080,
    fs = require("fs");

// var users = require('./routes/users');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/myApp', {})
    .then(() => console.log('MongoDB started'))
    .catch( e => console.log('mongoDB error' + e));

require('./person.model');

const Person = mongoose.model('persons');

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


app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function (req, res) {
    res.send("users");
});

var users = [
    {
        id: "x",
        name: "1",
        password: "2",
        confirmPassword: "3",
        email: "4"
    },
    {
        name: "11",
        password: "22",
        confirmPassword: "33",
        mail: "44"
    }
];

app.post('/register', function (req, res) {

    if(!req.body) return res.sendStatus(400);


    var newUersData = {
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        confirmPassword: req.body.confirmPassword,
        userEmail: req.body.userEmail,
    };

    // users.push(newUersData);
    res.send(newUersData);

    console.log(newUersData);
    // res.json(req.body);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
    console.log("API app started on port " + port)
});

module.exports = app;




