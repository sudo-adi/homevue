import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to `req.user`
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
