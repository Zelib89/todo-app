const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connectDb, models } = require('./models');
const appRouter = require('./routes/app');
const authRouter = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/app', appRouter);
app.use('/', authRouter);

connectDb().then(() => {
  console.log('DB started');
});

module.exports = app;
