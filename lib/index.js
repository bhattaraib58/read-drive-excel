"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./env");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var errorHandler = _interopRequireWildcard(require("./middlewares/errorHandler"));

var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(errorHandler.bodyParser);
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //API Routes

app.use("/api", _routes["default"]);
app.use("*", function (req, res) {
  console.log("Path/Method Not Supported:: ".concat(req.url, " ").concat(req.method));
  res.json({
    error: {
      message: "Path/Method Not Supported"
    }
  });
});
app.use(errorHandler.genericErrorHandler);
app.listen(PORT, function () {
  console.log("Server Started on::".concat(PORT, "/api"));
});
var _default = app;
exports["default"] = _default;