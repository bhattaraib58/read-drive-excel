"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var ExcelController = _interopRequireWildcard(require("../controller/excelController"));

var router = (0, _express.Router)();
/*
 * GET /api/excel/id
 */

router.get("/:fileId", ExcelController.getById);
var _default = router;
exports["default"] = _default;