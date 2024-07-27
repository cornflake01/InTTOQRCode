const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const mongoose = require("mongoose");
const isObjectID = mongoose.Types.ObjectId.isValid;

router.get("/verifications/:id", (req, res) => {
  const documentID = req.params.id;
  if (isObjectID(documentID)) {
    getDocument(documentID).then((doc) => {
      doc ? res.send(doc) : res.sendStatus(404);
    });
  } else {
    throw new Error("Not an ID");
  }
});

async function getDocument(id) {
  const foundDocument = await Document.findById(id).exec();
  return foundDocument;
}

module.exports = router;
