require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const loginRouter = require('./routes/authUser');
const app = express();
const port = process.env.PORT || 3000;

// DB Connect
const mdb_uri = process.env.MDB_URI;
mongoose.connect(mdb_uri, () => {
  console.log('DB Connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESS_KEY,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', loginRouter);
app.listen(port, () => console.log(`Server running on port ${port}!`));
