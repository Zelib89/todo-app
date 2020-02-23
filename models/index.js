const mongoose = require('mongoose');
const User = require('./user');
const Todo = require('./todo');

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  });
};


const models = { User, Todo };

module.exports = { models, connectDb };
