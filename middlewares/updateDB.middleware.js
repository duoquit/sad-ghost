var Post = require('../Apps/models/post-db')

module.exports.updateDB_Middleware = function(req, res, next, data) {
    Post.find({}, '_id title content author created_at updated_at', function(err, post) {
        if (err) {
            console.log(err)
            return
        }
        data = post
    })

    next();
}