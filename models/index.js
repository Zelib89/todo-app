const mongoose = require('mongoose');
const User = require('./user');
const Todo = require('./todo');

const connectDb = () => {
  const mongoDb = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`

  return mongoose.connect(mongoDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  });
};


const models = { User, Todo };

module.exports = { models, connectDb };
