const express = require("express");
const router = express.Router();
const database = require("../config/database.js");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middleware/verifyToken");

function parseResult(result) {
  return Object.values(JSON.parse(JSON.stringify(result)));
}

// Profile Page --------------------------------------------------
router.get("/profile/:userId", verifyToken, function (req, res) {
  const userId = req.params.userId;
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `SELECT * FROM user WHERE id_user = '${userId}'`;

  database.query(sql, function (error, result) {
    if (error) throw error;

    const user = parseResult(result)[0];
    const username = user.username;
    
    res.render("profile", { userId, username, user, message: "" });
  });
});

// Update Profile Submit
router.post("/edit-profile/:userId", verifyToken, async function (req, res) {
  const userId = req.params.userId;
  const { username, oldPassword, newPassword, passwordConfirm } = req.body;

  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  // Ambil data user dari database
  const sql = `SELECT * FROM user WHERE id_user = ?`;
  database.query(sql, [userId], async function (error, result) {
    if (error) throw error;

    const user = parseResult(result)[0];

    // hanya mengupdate username
    if (newPassword === "" && oldPassword === "") {
      const updateSql = `UPDATE user SET username = ? WHERE id_user = ?`;
      database.query(updateSql, [username, userId], function (error, result) {
        if (error) throw error;
        return res.render("profile", { userId, username , user, message: "Update successful!"});
      });
    }
    // Jika mengganti username dan password
    else if (oldPassword !== "" && newPassword !== "") {
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        // Password lama salah
        return res.render("profile", { userId, username , user, message: "Old password is incorrect!"});
      }

      if (newPassword !== passwordConfirm) {
        // Password baru dan konfirmasi tidak sama
        return res.render("profile", { userId, username , user, message: "Password confirmation does not match"});
      }

      // Hash password baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateSql = `UPDATE user SET username = ?, password = ? WHERE id_user = ?`;
      database.query(
        updateSql,
        [username, hashedPassword, userId],
        function (error, result) {
          if (error) throw error;
          return res.render("profile", { userId, username , user, message: "Update successful!"});
        }
      );
    } else {
      // Jika hanya password yang diisi tetapi tidak valid
      return res.render("profile", { userId, username , user, message: "Incorrect password!" });
    }
  });
});

module.exports = router;
