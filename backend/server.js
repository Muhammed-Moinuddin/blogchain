const express = require('express');
const dbConnect = require('./database/index');
const router = require('./routes/index')
const {PORT} = require('./config/index');
const app = express();

dbConnect();
app.use(router);
app.listen(PORT, console.log(`App is running on port: ${PORT}`));