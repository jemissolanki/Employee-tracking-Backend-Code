const User = require("../models/users.model.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generate_token.utils.js");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("BODY ", req.body);
    const { username, email, password, postDesignation, education, age } =
      req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("user already exists");
    const user = await User.create({
      username,
      email,
      password,
      postDesignation,
      education,
      age,
    });
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    console.log(accessToken, refreshToken, user);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await !user.matchPassword(password)))
      return res.status(400).json({ message: "invalid Credentials " });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    console.log("Generated Access Token:", accessToken);

    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json({ message: accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

exports.refreshToken = async (req, res) => {
  console.log("R : ", req.body);

  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(403).json({ message: "no token provided " });
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decode) => {
      if (err)
        return res.status(403).json({ message: "invalid token provided" });
      const newAccessToken = jwt.sign(
        { userId: decode.userId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      return res.status(200).json({
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};
