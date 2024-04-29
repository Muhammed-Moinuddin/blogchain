const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../config/index");

class JWTService{
    //1. sign access token
    signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime});
    }
    //2. sign refresh token
    signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime})
    }
    //3. verify access token
    //4. verify refresh token
    //5. store refresh token
}