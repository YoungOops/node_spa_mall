const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },


});

module.exports = mongoose.model("products", productsSchema); //디폴츠라는 컬렉션