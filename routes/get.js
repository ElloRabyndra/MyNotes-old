const express = require("express");
const router = express.Router();
const database = require("../config/database.js");
const { verifyToken } = require("../middleware/verifyToken");

function parseResult(result) {
  return Object.values(JSON.parse(JSON.stringify(result)));
}


// Login Page ------------------------
router.get("/", function (req, res) {
  res.render("index", {message: ""});
});

// Register Page -----------------------------
router.get("/register", function (req, res) {
  res.render("register", {message: ""});
});

// Main Page --------------------------------------------------
router.get("/main/:userId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `SELECT * FROM notes WHERE id_user = '${userId}'`;

  database.query(sql, function (error, result) {
    if (error) throw error;

    const notes = parseResult(result);
    res.render("main", { userId, username, notes });
  });
});

// Pinned Page
router.get("/pinned/:userId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `SELECT * FROM notes WHERE id_user = '${userId}' AND pinned = 1`;

  database.query(sql, function (error, result) {
    if (error) throw error;

    const notes = parseResult(result);
    res.render("pinned", { userId, username, notes });
  });
});



module.exports = router;
