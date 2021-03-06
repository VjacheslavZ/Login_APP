var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res, next) => {

    if (req.session && req.session.userId) {
        return res.redirect('/user');
        next();
    }

    res.render('index', { title: 'VxZ' });
});


router.post('/', function (req, res, next) {

    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };

        //console.log(`userData = ${userData.email}, ${userData.username}, ${userData.password}, ${userData.passwordConf}`);

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                //console.log(`req.session.userId = ${req.session.userId}`);
                // return res.redirect('/profile');
                return res.redirect('/user');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {

            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;

                //return res.redirect('/profile/' + req.session.userId);
                return res.redirect('/user');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});



// GET route after registering
// router.get('/profile/:id', function (req, res, next) {
router.get('/user', function (req, res, next) {
    console.log(req.params.id);
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    res.render('user', {
                        username: user.username,
                        useremail: user.email
                    });
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {

    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
