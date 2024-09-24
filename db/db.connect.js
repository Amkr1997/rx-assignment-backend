require("dotenv").config({
  path: ".env",
});
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("connected successfully");
    }
  } catch (error) {
    console.log("connection failed", error);
  }
};

module.exports = { initializeDatabase };
