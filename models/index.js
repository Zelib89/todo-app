const mongoose = require('mongoose');
const User = require('./user');
const Todo = require('./todo');

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};


const models = { User, Todo };

module.exports = { models, connectDb };
