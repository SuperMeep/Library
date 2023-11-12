// middleware/auth.js
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to check user role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

// Middleware to validate token and extract user details
const requireAuth = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const { userId, role } = decodedToken;
      req.user = { userId, role };
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = {
  requireRole,
  requireAuth,
};
