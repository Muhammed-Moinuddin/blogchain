const {ValidationError} = require('joi');

const errorHandler = (error, req, res, next) => {
    
    //Default Error
    let status = 500;
    let data = {
        message: "Internal Server Error"
    }

    //If error is of Validation
    if (error instanceof ValidationError){
        status = 401;
        data.message = error.message;
        
        return res.status(status).json(data);
    }

    //If error has status value
    if (error.status) {
        status = error.status
    }

    //Error has message value
    if (error.message) {
        data.message = error.message;
    }

    return res.status(status).json(data);
}

module.exports = errorHandler;