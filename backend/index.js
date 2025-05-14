const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const cors = require ("cors");
const doctopdf = require("docx-pdf");
const path = require("path");

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    let outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );
    doctopdf(req.file.path, outputPath, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "error converting doc to pdf",
        });
      }
      res.download(outputPath, () => {
        console.log("file Download");
      });
      console.log("result" + result);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


