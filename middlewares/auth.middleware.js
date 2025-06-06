const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
 
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = auth;
