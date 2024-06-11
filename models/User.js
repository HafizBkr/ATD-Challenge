const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
