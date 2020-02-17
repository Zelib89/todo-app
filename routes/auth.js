const express = require('express');
const { generateJWTToken } = require('../common/authUtil');

const router = express.Router();

router.get('/sign-in', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || users[username] !== password) {
      return res.status(401).end();
    }
  
    const token = generateJWTToken({ username, password });

    res.cookie('token', token);
    res.end();
  
});

module.exports = router;
