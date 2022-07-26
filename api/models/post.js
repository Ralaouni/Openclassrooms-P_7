const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    forename: { type: String, required: true },
    job: { type: String, required: true },
    post: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
    date:{ type: Array, required: false},
});

module.exports = mongoose.model('Post', postSchema);