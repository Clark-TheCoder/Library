import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated. Please log back in and try again.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token. Please log back in and try again." });
  }
}
