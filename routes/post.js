const express=require('express');
const router=express.Router();
const Post=require('../models/postModel');

//Controller
const postController=require('../controllers/postController');

// posts
router.get('/addPost',postController.getPosts);
router.post('/addPost',postController.addPost);
router.patch('/editPost/:id', postController.editPost);
router.delete('/deletePost/:id', postController.deletePost);

module.exports=router;