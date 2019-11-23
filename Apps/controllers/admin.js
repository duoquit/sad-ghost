var express = require('express')
var router = express.Router()
var authMiddleware = require('../../middlewares/auth.middleware')
var Post = require('../models/post-db')
var update = require('../models/update-db')


// trang quan ly chinh
router.get('/', authMiddleware.requireAuth, async function(req, res) {
    var data;
    await Post.find({}, '_id title content author created_at updated_at', function(err, post) {
        if (err) {
            console.log(err)
            return
        }
        data = post
    })
    res.render('admin/dashboard.ejs', { data: data })
})

// trang them moi
router.get('/new', authMiddleware.requireAuth, function(req, res) {
    res.render('admin/new', { data: { error: false } })
})

router.post('/new', function(req, res) {
    var params = req.body;

    if (params.title.trim().length == 0) {
        var data = {
            error: "Please enter a title"
        };

        res.render("admin/new", { data: data });
    } else {
        var now = new Date();
        params.created_at = now.toDateString();
        params.updated_at = now.toDateString();

        var data_new_post = new Post({
            "title": params.title,
            "content": params.content,
            "author": params.author,
            "created_at": params.created_at,
            "updated_at": params.updated_at
        })

        data_new_post.save(function(err) {
            if (err) {
                var data = {
                    error: "Could not insert post"
                };
                res.render("admin/new", { data: data });
                return
            }
            res.redirect('/admin')
        })
    }
});

// trang chinh sua
router.get('/edit/:id', async function(req, res) {
    var id = req.params.id;
    var data;
    await Post.find({ '_id': id }, '_id title content author created_at updated_at', function(err, post) {
        if (err) {
            console.log(err)
            return
        }
        data = post[0];
        data.error = false;
    })
    res.render('admin/edit.ejs', { data: data })
})

router.put("/edit/:id", function(req, res) {
    var params = req.body;
    var id = req.params.id;
    var now = new Date();
    params.created_at = now.toDateString();
    params.updated_at = now.toDateString();

    Post.findOneAndUpdate({ "_id": id }, {
            $set: {
                "title": params.title,
                "content": params.content,
                "author": params.author,
                "created_at": params.created_at,
                "updated_at": params.updated_at
            }
        }, { new: true },
        function(err, doc) {
            if (err) {
                res.json({ status_code: 500 });
                throw err;
            } else {
                res.json({ status_code: 200 })
                console.log("Updated");
            }
        })
})

// api xoa post

router.delete("/", async function(req, res) {
    var id = req.body.id;
    console.log(id)
    await Post.findOneAndDelete({ "_id": id }, function(err, doc) {
        if (err) {
            res.json({ status_code: 500 });
            throw err;
        } else {
            res.json({ status_code: 200 })
            console.log("delete complete !");
        }
    })
})

module.exports = router