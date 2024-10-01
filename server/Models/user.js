const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    score: Number,
    imgURL: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
