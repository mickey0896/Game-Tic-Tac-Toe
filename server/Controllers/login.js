const User = require("../Models/user");

exports.login = async (req, res) => {
  try {
    let { name, email, imgURL } = req.body;
    const score = 0;
    imgURL =
      "https://img.freepik.com/premium-vector/cute-cartoon-cat-profile-avatar_1177872-8.jpg";

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { name, imgURL },
        { new: true }
      );
      return res.json({
        message: "Login Successful! User updated.",
        user: updatedUser,
      });
    } else {
      const newUser = new User({
        name,
        email,
        score,
        imgURL,
      });
      const userLogin = await newUser.save();
      return res.json({
        message: "Register Successful!",
        user: userLogin,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
