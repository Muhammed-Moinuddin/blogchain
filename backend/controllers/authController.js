const Joi = require('joi');

const authController = {
    
    //controller for user registeration
    async register() {
        //1. validate user input data
        const userRegisterSchema = Joi.object({
            username: Joi.string().alphanum().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$')).required(),
            confirmPassword: Joi.ref('password')
        })
        const {error} = userRegisterSchema.validate(req.body);
        //2. if validation error -> return error via middleware
        //3. if email or username already registered -> return error
        //4. password hash
        //5. store user data in db
        //6. response send
    },

    //controller for login functionality
    async login() {

    }
};

module.exports = authController;