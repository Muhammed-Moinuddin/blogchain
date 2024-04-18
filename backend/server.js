const express = require('express');
const dbConnect = require('./database/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const {PORT} = require('./config/index');
const app = express();

dbConnect();
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(PORT, console.log(`App is running on port: ${PORT}`));