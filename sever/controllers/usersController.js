const User = require("../model/userModel");
const brcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "email already used", status: false });
    }
    const hashedPassword = await brcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid = await brcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      avatarImage,
      isAvatarImage: true,
    });
    return res.json({
      isSet: userData.isAvatarImage,
      image: userData.avatarImage,
    });
  } catch(ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const allUsers = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatarImage",
      "isAvatarImage",
      "_id",
    ]);
    return res.json(allUsers);
  } catch (ex) {
    next(ex);
  }
};

