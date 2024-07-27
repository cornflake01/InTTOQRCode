const mongoose = require("mongoose");

async function dbConnect() {
  const dbUri = `mongodb+srv://intto-admin:${process.env.DB_CRED}@intto-qr-system.0xxull9.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(dbUri).then(() => {
    console.log("Database Connected!");
  });
}

module.exports = dbConnect;
