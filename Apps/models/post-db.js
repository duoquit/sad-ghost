var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    "title": String,
    "content": String,
    "author": String,
    "created_at": String,
    "updated_at": String
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;