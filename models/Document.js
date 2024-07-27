const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  fullName: String,
  certificate: String,
  eventTitle: String,
  eventLocation: String,
  dateOfEvent: Date,
});

const Document = new mongoose.model("Document", documentSchema);

module.exports = Document;
