const express = require('express')

const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controller/post');

const multer = require ('../middleware/multer-config')



router.post('/', auth, multer,postCtrl.createPost);

router.put('/:id', auth, multer, postCtrl.modifyPost);

router.delete('/:id', auth, postCtrl.deletePost);

router.get('/:id', auth, postCtrl.getOnePost);

router.get('/', auth, postCtrl.getAllPost);

router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;