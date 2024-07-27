const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConnect = require("./utils/dbconnect");
dotenv.config();
const oauth2Client = require("./config/oauth");
const app = express();
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use(cors());
app.use("/public", express.static(__dirname + "/public"));
app.use(require("./routes/auth"));
app.use(require("./routes/redirect"));
app.use(require("./routes/generate"));
app.use(require("./routes/verification"));
app.use(express.json());

if (!fs.existsSync("qr")) {
  fs.mkdirSync("qr");
}
if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}
if (!fs.existsSync("drive")) {
  fs.mkdirSync("drive");
}
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

try {
  const creds = fs.readFileSync("creds.json");
  oauth2Client.setCredentials(JSON.parse(creds));
} catch (err) {
  console.log("No creds found");
}

app.listen(3000 || process.env.PORT, () => {
  console.log("Server is running!");
});
