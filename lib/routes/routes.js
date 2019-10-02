"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _excelRoutes = _interopRequireDefault(require("./excelRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", function (req, res) {
  res.json({
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION
  });
});
router.use("/excel", _excelRoutes["default"]);
router.use("*", function (req, res) {
  console.log("Path/Method Not Supported:: ".concat(req.url, " ").concat(req.method));
  res.json({
    error: {
      message: "Path/Method Not Supported"
    }
  });
});
var _default = router;
exports["default"] = _default;