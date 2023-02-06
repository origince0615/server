const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { parse } = require("csv-parse");
const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT || 3003;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const readStatesData = (path) =>
  new Promise((resolve, reject) => {
    const stateData = [];
    fs.createReadStream(path)
      .pipe(
        parse({
          delimiter: ",",
          columns: true,
          ltrim: true,
        })
      )
      .on("data", function (row) {
        // 👇 push the object row into the array
        stateData.push(row);
      })
      .on("error", function (error) {
        console.log(error.message);
        reject(error);
      })
      .on("end", function () {
        // 👇 log the result array
        resolve(stateData);
      });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
