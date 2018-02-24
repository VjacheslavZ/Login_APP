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
    .catch(e => console.log('mongoDB error' + e));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function () {
    // we're connected!
//});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/users', function (req, res) {
//     res.send("users");
// });


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



