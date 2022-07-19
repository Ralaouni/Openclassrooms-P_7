const express = require('express')

const router = express.Router();

// const auth = require('../middleware/auth');

const postCtrl = require('../controller/post');

const multer = require ('../middleware/multer-config')



router.post('/',  multer, postCtrl.createPost);

router.put('/:id',  multer, postCtrl.modifyPost);

router.delete('/:id',  postCtrl.deletePost);

router.get('/:id',  postCtrl.getOnePost);

router.get('/', postCtrl.getAllPost);

router.post('/:id/like',  postCtrl.likePost);

module.exports = router;