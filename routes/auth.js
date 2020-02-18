const express = require('express');
const router = express.Router();
const { secret } = require('../constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/login', (req, res) => {

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token });
  });

});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  }, 
  (err, user) => {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token });
  });

});

module.exports = router;