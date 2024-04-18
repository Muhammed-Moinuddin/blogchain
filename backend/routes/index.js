const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();

router.get('/test', (req,res) => res.json({msg: "Hello World From Moin"}));

//route for registeration with controller/handler 
router.post('/register', authController.register);

//route for login with controller/handler
router.post('/login', authController.login);

module.exports = router;
// USER
// login, logout, register, refresh

// BLOG
// create, read-all-blogs, read-blog-by-id, update, delete

// COMMENT
// create, read-comments-by-blog-id