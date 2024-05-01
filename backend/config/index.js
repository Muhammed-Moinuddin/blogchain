require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
        PORT,
        MONGODB_URL,
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET
}