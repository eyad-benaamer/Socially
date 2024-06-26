import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json("login first");
    }
    if (token.startsWith("Bearer ")) {
      token = token.trimStart().slice(7);
    }
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userInfo.id);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(403).json("invalid token or user doesn't exist");
    }
  } catch {
    return res
      .status(500)
      .json({ message: "An error occurred. Plaese try again later." });
  }
};
