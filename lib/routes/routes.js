"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _excelRoutes = _interopRequireDefault(require("./excelRoutes"));

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.json({
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION
  });
});
router.use('/excel', _excelRoutes["default"]);
var _default = router;
exports["default"] = _default;