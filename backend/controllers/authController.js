const Joi = require('joi');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/;
const JWTService = require('../services/JWTService');

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
        let accessToken;
        let refreshToken;
        let user;
        try {
            const userToRegister = new User({
                username,
                email,
                name,
                password: hashedPassword
            });
            user = await userToRegister.save();
            //token generation
            accessToken = JWTService.signAccessToken({_id: user._id, username: user.email}, '30m');
            refreshToken = JWTService.signRefreshToken({_id: user._id}, "60m");

        } catch (error) {
            return next(error);
        }
        //store refresh token to DB
        JWTService.storeRefreshToken(refreshToken, user._id);

        //sending tokens via cookies to client
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })
        //6. response send
        const userDto = new UserDTO(user);
        return res.status(201).json({userDto});
    },

    //controller for login functionality
    async login(req, res, next) {
        //4. return response.

        //1. validate user input.
        const userLoginSchema = Joi.object({
            username: Joi.string().alphanum().min(5).max(30).required(),
            password: Joi.string().pattern(passwordPattern).required(),
        });

        //2. if validation error, return error.
        const {error} = userLoginSchema.validate(req.body);
        if(error){
            return next(error);
        }

        //3. match username and password
        const {username, password} = req.body;
        let user;
        try {
            // username matching
            user = await User.findOne({username: username});
            if(!user){
                const error = {
                    status: 401,
                    message: "Invalid Username"
                }
                return next(error);
            }
            //password matching
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                const error = {
                    status: 401,
                    message: "Invalid password"
                }
                return next(error);
            }
        } catch (error) {
            return next(error);
        }

        //implementing DTO(data transfer object
        const userDto = new UserDTO(user);
        return res.status(200).json({user: userDto});
    }
};

module.exports = authController;