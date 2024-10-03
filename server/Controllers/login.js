const User = require("../Models/user");

exports.login = async (req, res) => {
  try {
    let { name, email, imgURL } = req.body;
    const score = 0;

    if (!imgURL) {
      imgURL =
        "https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png";
    }

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
