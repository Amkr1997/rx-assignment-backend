const mongoose = require("mongoose");

const teachersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  subject: String,
});

const Teacher = mongoose.model("Teacher", teachersSchema);

module.exports = { Teacher };
