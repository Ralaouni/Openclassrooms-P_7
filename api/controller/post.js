
const Post = require('../models/post');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
    const postObject = req.body.post;
    delete postObject._id;
    const post = new Post({
      ...postObject,
      likes: 0,
      dislikes: 0,
      usersLiked:[],
      usersDisliked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(post.imageUrl)
    post.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const Id = (JSON.parse(req.body.post)).userId
    if (Id !== decodedToken.userId) {
      res.status(400).json({
        error: new Error('Unauthorized request!')
      });
    }
      const postObject = req.file ?
      {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      
      Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      if (!post) {
        res.status(404).json({
          error: new Error('No such post!')
        });
      }
      if (post.userId !== decodedToken.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then(post =>  res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
}

exports.getAllPost = (req, res, next) => {
    Post.find()
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({error}))
}

exports.likePost = (req, res, next ) => {
  Post.findOne({ _id: req.params.id})
    .then(post => {
      console.log(req.body)
      if (req.body.like === 1) {
        post.likes +=1
        post.usersLiked.push(req.body.userId)
      } else if (req.body.like === 0) {
          if (post.usersLiked.indexOf(req.body.userId) > -1) {
            post.usersLiked.splice(post.usersLiked.indexOf(req.body.userId))
            post.likes -= 1
          }
          if (post.usersDisliked.indexOf(req.body.userId) > -1) {
            post.usersDisliked.splice(post.usersDisliked.indexOf(req.body.userId))
            post.dislikes -= 1
          }
        }
        else {
          post.dislikes +=1
          post.usersDisliked.push(req.body.userId)
        }
      post.save()
      res.status(200).json(post)
      
    })
    .catch(error => res.status(400).json({ error }));
}