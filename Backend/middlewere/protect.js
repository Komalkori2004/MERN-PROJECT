// =======middlewere=========
const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const protect = async (req, res, next) => {
  // console.log("==== DEBUG START ====");
  // console.log("Headers:", req.headers);
  // console.log("Authorization Header:", req.headers.authorization);
  // console.log("==== DEBUG END ====");
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

module.exports = { protect, isAdmin };
