const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, default: '' },
  status: { type: String, default: '' },
  userId: { type: String, default: '' },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;