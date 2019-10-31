"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyParser = bodyParser;
exports.genericErrorHandler = genericErrorHandler;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

function bodyParser(err, req, res, next) {
  res.status(err.status).json({
    error: {
      code: err.status,
      message: _httpStatusCodes["default"].getStatusText(err.status)
    }
  });
}

function genericErrorHandler(err, req, res, next) {
  res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
    error: {
      name: err.constraint || err.name,
      message: err.detail || err.message
    }
  });
}