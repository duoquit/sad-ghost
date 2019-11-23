var express = require('express')
var router = express.Router()
var md5 = require('md5')
var User = require('../models/user-db');

router.get('/', function(req, res) {
    res.render('login')
})

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = md5(password);

    User.find({ user_name: email }, 'user_name password', function(err, user) {
        if (user.length != 0) {
            if (user[0].password !== hashedPassword) {
                res.render('login');
                return;
            }
            res.cookie('userID', user[0]._id, {
                signed: true
            })
            res.redirect('/admin');
            return;
        }
        res.render('login');
    })
})

module.exports = router