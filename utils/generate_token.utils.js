const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15min",
    });
  } catch (error) {
    console.error("error accessing token : ", error.message);
    throw error("token generation failed");
  }
};

const generateRefreshToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.error("error refreshing token : ", error.message);
    throw error("token generation failed");
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
