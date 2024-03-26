const mongoose = require('mongoose');
const {MONGODB_URL} = require('../config/index');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        console.log(`Database connected to host: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = dbConnect;