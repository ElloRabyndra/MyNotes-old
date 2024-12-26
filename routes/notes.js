const express = require("express");
const router = express.Router();
const database = require("../config/database.js");
const { verifyToken } = require("../middleware/verifyToken");

function parseResult(result) {
  return Object.values(JSON.parse(JSON.stringify(result)));
}

// Add Notes Page ------------------------------------------------------
router.get("/add/:userId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username;
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `SELECT * FROM notes WHERE id_user = '${userId}'`;

  database.query(sql, function (error, result) {
    if (error) throw error;
    const notes = parseResult(result);
    res.render("addNotes", { userId, username, notes });
  });
});

// View Notes Page -------------------------------------------------------------
router.get("/view/:userId/:noteId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username;
  const noteId = req.params.noteId;
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `SELECT * FROM notes WHERE id_user = ? AND id_notes = ?`;

  database.query(sql, [userId, noteId], function (error, result) {
    if (error) throw error;
    const note = parseResult(result)[0];
    res.render("viewNotes", { userId, username, note});
  });
});

// Update Notes Page -------------------------------------------------------------
router.get("/update/:userId/:noteId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username;
  const noteId = req.params.noteId;
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `SELECT * FROM notes WHERE id_user = ? AND id_notes = ?`;

  database.query(sql, [userId, noteId], function (error, result) {
    if (error) throw error;
    const note = parseResult(result)[0];
    res.render("updateNotes", { userId, username, note});
  });
});

// Add Notes Submit -----------------------------------------------------------
router.post("/add-submit/:userId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username;
  const tittle = req.body.tittle;
  const content = req.body.content;
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `INSERT INTO notes (id_user, tittle, content) VALUES (?, ?, ?)`;
  database.query(sql, [userId, tittle, content], function (error, result) {
    if (error) throw error;
    res.redirect(`/main/${userId}/${username}`);
  });
});

// Update Notes Submit -----------------------------------------------------------
router.post("/update-submit/:userId/:noteId/:username", verifyToken, function (req, res) {
  const userId = req.params.userId;
  const username = req.params.username;
  const noteId = req.params.noteId;
  const tittle = req.body.tittle;
  const content = req.body.content;
  if (userId != req.user.id) {
    return res.status(403).redirect("/");
  }

  const sql = `UPDATE notes set tittle = ?, content = ? WHERE id_user = ? AND id_notes = ?`;
  database.query(sql, [tittle, content, userId, noteId], function (error, result) {
    if (error) throw error;
    res.redirect(`/main/${userId}/${username}`);
  });
});

// Pinned Notes ----------------------------------------------------------------
router.post("/pinned/:userId/:noteId/:username", verifyToken,function (req, res) {
    const userId = req.params.userId;
    const username = req.params.username;
    const noteId = req.params.noteId;
    const tittle = req.body.tittle;
    const content = req.body.content;
  
    if (userId != req.user.id) {
      return res.status(403).redirect("/");
    }

    const sql = `UPDATE notes SET pinned = 1 WHERE id_user = ? AND id_notes = ?`;
    database.query(sql, [userId, noteId], function (error, result) {
      if (error) throw error;
      res.redirect(`/main/${userId}/${username}`);
    });
  }
);

// Unpinned Notes ----------------------------------------------------------------
router.post("/unpinned/:userId/:noteId/:username", verifyToken,function (req, res) {
    const userId = req.params.userId;
    const username = req.params.username;
    const noteId = req.params.noteId;
    if (userId != req.user.id) {
      return res.status(403).redirect("/");
    }

    const sql = `UPDATE notes SET pinned = 0 WHERE id_user = ? AND id_notes = ?`;
    database.query(sql, [userId, noteId], function (error, result) {
      if (error) throw error;
      res.redirect(`/pinned/${userId}/${username}`);
    });
  }
);

// Delete Notes - Main ----------------------------------------------------------------
router.post("/delete/:userId/:noteId/:username", verifyToken,function (req, res) {
    const userId = req.params.userId;
    const username = req.params.username;
    const noteId = req.params.noteId;
    if (userId != req.user.id) {
      return res.status(403).redirect("/");
    }

    const sql = `DELETE FROM NOTES WHERE id_user = ? AND id_notes = ?`;
    database.query(sql, [userId, noteId], function (error, result) {
      if (error) throw error;
      res.redirect(`/main/${userId}/${username}`);
    });
  }
);

// Delete Notes - Pinned ----------------------------------------------------------------
router.post("/delete-pinned/:userId/:noteId/:username", verifyToken,function (req, res) {
    const userId = req.params.userId;
    const username = req.params.username;
    const noteId = req.params.noteId;
    if (userId != req.user.id) {
      return res.status(403).redirect("/");
    }

    const sql = `DELETE FROM NOTES WHERE id_user = ? AND id_notes = ?`;
    database.query(sql, [userId, noteId], function (error, result) {
      if (error) throw error;
      res.redirect(`/pinned/${userId}/${username}`);
    });
  }
);

module.exports = router;
