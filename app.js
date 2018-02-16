var express = require('express');
var app = express();



var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var index = require('./routes/index');
// var users = require('./routes/users');


var bodyParser = require('body-parser');
app.use(bodyParser.json()); /*парсим json*/
app.use(bodyParser.urlencoded({
    extended: false
}));



var users = [
    {
        id: 1,
        name: "Slavik"
    },
    {
        id: 2,
        name: 'Alex'
    }
];

// app.get('/', function (req, res) {
//     res.send("hello");
// });
app.get('/users', function (req, res) {
    res.send(users);
});

app.get('/users/:id', function (req, res) {
    var user = users.find(function (user) {
       return user.id === Number(req.params.id)
    });

    res.send(user);
});

app.post('/users', function (req, res) {
    var user = {
        id: Date.now(),
        name: req.body.name
    };

    console.log(JSON.stringify(req.body));

    users.push(user);
    res.send(JSON.stringify(req.body))
});

app.listen(3012, function () {
    console.log("API app started on port 3012")
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

module.exports = app;
