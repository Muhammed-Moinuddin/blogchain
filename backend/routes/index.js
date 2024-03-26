const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();

router.get('/test', (req,res) => res.json({msg: "Hello World From Moin"}));

//route for registeration with controller 
router.post('/register', authController.register);

//route for login with controller
router.post('/login', authController.login);

module.exports = router;