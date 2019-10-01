"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./env");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _googleSpreadsheet = _interopRequireDefault(require("google-spreadsheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var APP_PORT = process.env.APP_PORT || 4000;
var APP_HOST = process.env.APP_HOST || "127.0.0.1";

var credentials = require("../client_secret.json");

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
var link = "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"; // Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new _googleSpreadsheet["default"]("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms");
var resData = null;
doc.useServiceAccountAuth(credentials, function (err) {
  console.log(err);
  doc.getRows(1, function (error, rows) {
    resData = rows;
    console.log(error); // console.log(rows);
  });
});
app.use("/api", function (req, res) {
  res.json({
    response: {
      message: "hello api",
      data: resData
    }
  });
});
app.use("*", function (req, res) {
  console.log("Path/Method Not Supported:: ".concat(req.url, " ").concat(req.method));
  res.json({
    error: {
      message: "Path/Method Not Supported"
    }
  });
});
app.listen(APP_PORT, APP_HOST, function () {
  console.log("Server Started on:: ".concat(APP_HOST, ":").concat(APP_PORT, "/api"));
});
var _default = app;
exports["default"] = _default;