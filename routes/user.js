const express=require('express');
const router=express.Router();

const authController=require('../controllers/authController');

router.post('/signUp', authController.addUser);
router.post('/login', authController.login);
module.exports=router;


