const multer = require("multer");
const { join } = require("path");
const storagePath = join(__dirname, "..");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
