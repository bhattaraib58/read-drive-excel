"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = getById;

var ExcelService = _interopRequireWildcard(require("../service/excelService"));

function getById(req, res, next) {
  ExcelService.getById(req.params.fileId).then(function (data) {
    return res.json({
      data: data
    });
  })["catch"](function (err) {
    return next({
      name: 'Please Check File Id',
      message: err
    });
  });
}