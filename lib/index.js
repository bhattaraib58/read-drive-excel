"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./env");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var APP_PORT = process.env.APP_PORT || 4000;
var APP_HOST = process.env.APP_HOST || "127.0.0.1";
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/api', function (req, res) {
  res.json({
    response: {
      message: 'hello api'
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