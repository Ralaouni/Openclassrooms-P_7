
const Post = require('../models/post');
const fs = require('fs');
const jwt = require('jsonwebtoken');
// const post = require('../models/post');

exports.createPost = (req, res, next) => {
  console.log(req.body)
  console.log(req.body.post)
  const userId = req.body.cookies.split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1]
  const name = req.body.cookies.split('; ')
    .find(row => row.startsWith('name'))
    .split('=')[1]
  const forename = req.body.cookies.split('; ')
    .find(row => row.startsWith('forename'))
    .split('=')[1]
  const job = req.body.cookies.split('; ')
    .find(row => row.startsWith('job'))
    .split('=')[1]
  const post = new Post({
    userId: userId,
    name: name,
    forename: forename,
    job: job,
    post: req.body.post,
    date: req.body.date,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  if (req.file !== undefined) {
    post.imageUrl = (`${req.protocol}://localhost:3000/images/${req.file.filename}`)
  }

  post.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split('; ')
    .find(row => row.startsWith('token'))
    .split('=')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const Id = req.body.cookies.split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1];
    if (Id !== decodedToken.userId || Id !== "62ded2ffb75bb970f2a22a66") {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      })
    }
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const postObject = {}
      if (req.body.post === 'null') {
        postObject.post = post.post
      } else {
        postObject.post = req.body.post
      }
      if (req.file !== undefined) {

        postObject.imageUrl = `${req.protocol}://localhost:3000/images/${req.file.filename}`
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`../public/images/${filename}`, (err) => {
          if (err) { console.log(err) }
          else { console.log("file deleted") }
        })
      } else if (post.imageUrl !== undefined && req.body.image === 'null') {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`../public/images/${filename}`, (err) => {
          if (err) { console.log(err) }
          else { console.log("file deleted") }
        })
        postObject.imageUrl = ''
      }
      Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    })
    .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const token = req.headers.authorization.split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const Id = req.headers.authorization.split('; ')
      .find(row => row.startsWith('userId'))
      .split('=')[1];
      if (!post) {
        res.status(404).json({
          error: new Error('No such post!')
        });
      }
      if (post.userId !== decodedToken.userId || Id !== "62ded2ffb75bb970f2a22a66") {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      if (post.imageUrl !== undefined) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`../public/images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      } else {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllPost = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (req.body.like === 1 && post.usersLiked.indexOf(req.body.userId) === -1) {
        post.likes += 1
        post.usersLiked.push(req.body.userId)
        if (post.usersDisliked.includes(req.body.userId)) {
          post.usersDisliked.splice(post.usersDisliked.indexOf(req.body.userId))
          post.dislikes -= 1
        }
      } else if (req.body.like === -1 && post.usersDisliked.indexOf(req.body.userId) === -1) {
        post.dislikes += 1
        post.usersDisliked.push(req.body.userId)
        if (post.usersLiked.includes(req.body.userId)) {
          post.usersLiked.splice(post.usersLiked.indexOf(req.body.userId))
          post.likes -= 1
        }
      } else if (req.body.like === 1 && post.usersLiked.includes(req.body.userId)) {
        post.usersLiked.splice(post.usersLiked.indexOf(req.body.userId))
        post.likes -= 1
      } else if (req.body.like === -1 && post.usersDisliked.includes(req.body.userId)) {
        post.usersDisliked.splice(post.usersDisliked.indexOf(req.body.userId))
        post.dislikes -= 1
      }
      post.save()
      res.status(200).json(post)
    })
    .catch(error => res.status(400).json({ error }));
}