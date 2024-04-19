const Joi = require('joi');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/;
const authController = {
    
    //controller for user registeration
    async register(req, res, next) {
        //1. validate user input data
        const userRegisterSchema = Joi.object({
            username: Joi.string().alphanum().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        })
        
        //2. if validation error -> return error via middleware
        const {error} = userRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        //3. if email or username already registered -> return error
        const {username, name, email, password} = req.body;

        try{
            const emailInUse = await User.exists({email});
            const usernameInUse = await User.exists({username});

            if(emailInUse){
                const error = {
                    status: 409,
                    message: "Email already registered, use another one"
                }
                return next(error);
            }

            if(usernameInUse){
                const error = {
                    status: 409,
                    message: "Username not available, try another one"
                }
                return next(error);
            }

        } catch(error) {
            return next(error);
        }

        //4. password hash
        const hashedPassword = await bcrypt.hash(password, 10); 

        //5. store user data in db
        let user;
        const userToRegister = new User({
            username,
            email,
            name,
            password: hashedPassword
        });
        user = await userToRegister.save();

        //6. response send
        return res.status(201).json({user});
    },

    //controller for login functionality
    async login() {

    }
};

module.exports = authController;