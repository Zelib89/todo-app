const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

const Todo = require('../models/todo');

router.use(verifyToken);
router.get('/', (req, res) => {

  Todo.find({}, (err, data) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!data) return res.status(404).send('No data found.');

    res.status(200).send({ auth: true, data });
  });

});

router.post('/', (req, res) => {
  Todo.create({
    text: req.body.text,
    status:  req.body.status,
    userId: req.userId,
  }, (err, data) => {
    if (err) return res.status(500).send("There was a problem adding new todo.");

    res.status(200).send({ data });
  });

});

module.exports = router;