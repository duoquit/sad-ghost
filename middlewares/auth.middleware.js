var User = require('../Apps/models/user-db');

module.exports.requireAuth = function(req, res, next) {
    if (!req.signedCookies.userID) {
        res.redirect('/login');
        return;
    }

    User.find({ _id: req.signedCookies.userID }, '_id', function(err, user) {
        if (user.length == 0) {
            res.redirect('/login');
            return;
        }
    })
    next()
};