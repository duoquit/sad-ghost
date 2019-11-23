var express = require('express')
var router = express.Router()

var Post = require('../models/post-db')

router.get('/', async function(req, res) {
    var data;
    await Post.find({}, '_id title content author created_at updated_at', function(err, post) {
        if (err) {
            console.log(err)
            return
        }
        data = post
    })
    res.render('blog/index', { data: data })
})

router.get('/about', function(req, res) {
    res.render('blog/about')
})

router.get('/:id', async function(req, res) {
    var id = req.params.id;
    var data;
    await Post.find({ '_id': id }, '_id title content author created_at updated_at', function(err, post) {
        if (err) {
            console.log(err)
            return
        }
        data = post;
    })
    res.render('blog/post', { data: data })
})

module.exports = router