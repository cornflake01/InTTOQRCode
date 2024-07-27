const express = require("express");
const router = express.Router();
const oauth2Client = require("../config/oauth");
const fs = require("fs");

router.get("/google/redirect", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials({
    access_token: tokens,
  });
  fs.writeFileSync("creds.json", JSON.stringify(tokens));
  res.send("success");
});

module.exports = router;
