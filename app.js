var express = require('express');
var app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    index = require('./routes/index'),
    port = 8080;

// var users = require('./routes/users');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myApp', { })
    .then(() => console.log('mongoDB started'))
    .catch( e => console.log(e) );

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

app.post('/newUser', function (req, res) {

    var newUersData = {
        id: Date.now(),
        name: req.body.name,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email
    };

    users.push(newUersData);
    res.send(users);

    console.log(req.body);
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




