var express = require('express')

var router = express.Router();

router.use('/admin', require(__dirname + '/admin'))
router.use('/blog', require(__dirname + '/blog'))
router.use('/login', require(__dirname + '/login'))

router.get('/', function(req, res) {
    res.redirect('/blog')
})

module.exports = router