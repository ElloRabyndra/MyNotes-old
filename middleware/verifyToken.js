// Melakukan Validasi Token Pada Setiap Request
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      // Token invalid
      req.user = null;
      return res.status(401).redirect("/");
    }
  } else {
    // Tidak ada token
    req.user = null;
    return res.status(403).redirect("/");
  }
}

module.exports = { verifyToken };
