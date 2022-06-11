const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('../config/passport-config');

// LOGIN ROUTE
router.post(
  '/login',
  passport.authenticate('local-login', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  function (req, res) {
    console.log(req.user);
    const user = req.user;
    const token = user.createJWT();
    res.status(200).json({
      user: {
        username: user.username,
      },
      token,
    });
  }
);

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({
      username,
      password,
    });

    // Creo il token
    const token = user.createJWT();
    console.log(user);
    res.status(201).send({
      user: {
        username,
      },
      token,
    });
  } catch (err) {
    console.log('ERROR: ' + err.message);
  }
});

module.exports = router;
