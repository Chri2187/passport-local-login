require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.pre('save', async function () {
  const hashPwd = await bcrypt.hash(this.password, 10);
  this.password = hashPwd;
});

// crea JWT per utente registrato
userSchema.methods.createJWT = () => {
  return jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Confronto la pwd
userSchema.methods.verifyPassword = async function (candidate) {
  const match = await bcrypt.compare(candidate, this.password);
  return match;
};

module.exports = mongoose.model('User', userSchema);
