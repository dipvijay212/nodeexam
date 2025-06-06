const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  pass: String,
  city: String,
  age: Number,
});

module.exports = mongoose.model("User", userSchema);
