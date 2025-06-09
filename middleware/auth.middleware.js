const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) return res.status(401).json({ message: "user not found" });
      next();
    } catch (error) {
      res.status(401).json({ message: "not authorized " });
    }
  }
  if (!token) res.status(401).json({ message: "not authorized  , no token" });
};

module.exports = { protect };
