const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  try {
    // console.log("-------", req.body);
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "sucess",
      data: { token, displayName: user.displayName }
    });
  } catch (e) {
    console.log("-------", e);
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      const err = new Error("User is not correct");
      err.statusCode = 400;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        data: {
          token,
          userName: user.displayName
        }
      });
    } else {
      const err = new Error("Password is not correct");
      err.statusCode = 400;
      return next(err);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { register, login };
