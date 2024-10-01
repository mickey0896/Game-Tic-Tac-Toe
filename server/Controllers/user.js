const User = require("../Models/user");

exports.read = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email }).exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    const email = req.query.email;

    if (email) {
      const user = await User.findOne({ email }).exec();
      return res.json({
        message: "Get User by Email Successful!",
        user: user,
      });
    } else {
      const users = await User.find().exec();
      return res.json({
        message: "Get All Users Successful!",
        users: users,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).exec();
    let score = user.score;
    switch (req.body.end) {
      case "Win":
        score += 1;
        break;
      case "Lose":
        if (score > 0) {
          score -= 1;
        } else {
          score;
        }
        break;
      case "ConsecutiveWin":
        score += 3;
        break;
      default:
        break;
    }
    const updateData = { score: score };
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updateData,
      { new: true }
    ).exec();
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
