const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:passw0rd@cluster0.oqivk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("BD Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
