const Joi = require('joi');

const authController = {
    
    //controller for user registeration
    async register() {
        //1. validate user input data
        const userRegisterSchema = joi.object({
            username: Joi.string().alphanum().min(5).max(30).required,
            name: Joi.string().max(30).required,
        })
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