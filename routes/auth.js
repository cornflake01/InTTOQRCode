const express = require("express");
const router = express.Router();
const oauth2Client = require("../config/oauth");
const scopes = require("../config/scopes");

router.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});

module.exports = router;
