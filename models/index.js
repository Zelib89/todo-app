const mongoose = require('mongoose');
const User = require('./user');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};


const models = { User };

module.exports = { models, connectDb };
