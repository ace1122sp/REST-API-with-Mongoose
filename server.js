const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const router = require('./routes');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

//setup mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx-course-assignment4')
        .catch(err => {
          console.error(err);
          process.exit(1);
        });

//middlewares
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(router);
app.use(errorhandler());

//mount server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
