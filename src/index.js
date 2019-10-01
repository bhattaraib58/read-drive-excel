import "./env";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import GoogleSpreadsheet from "google-spreadsheet";

const app = express();

const APP_PORT = process.env.APP_PORT || 4000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";

const credentials = require("../client_secret.json");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const link =
  "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit";

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet(
  "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
);

let resData = null;

doc.useServiceAccountAuth(credentials, err => {
  console.log(err);

  doc.getRows(1, (error, rows) => {
    resData = rows;
    console.log(error);
    // console.log(rows);
  });
});

app.use("/api", (req, res) => {
  res.json({
    response: {
      message: "hello api",
      data: resData
    }
  });
});

app.use("*", (req, res) => {
  console.log(`Path/Method Not Supported:: ${req.url} ${req.method}`);
  res.json({
    error: {
      message: "Path/Method Not Supported"
    }
  });
});

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Server Started on:: ${APP_HOST}:${APP_PORT}/api`);
});

export default app;
