"use strict";

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var APP_PORT = process.env.APP_PORT || 4000;
var APP_HOST = process.env.APP_HOST || "127.0.0.1";
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(errorHandler.bodyParser);
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //API Routes

app.use("/api", _routes["default"]);
app.use(errorHandler.genericErrorHandler);
app.listen(APP_PORT, APP_HOST, function () {
  console.log("Server Started on:: ".concat(APP_HOST, ":").concat(APP_PORT, "/api"));
});
var _default = app;
exports["default"] = _default;