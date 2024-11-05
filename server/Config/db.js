const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      ""
    );
    console.log("BD Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
