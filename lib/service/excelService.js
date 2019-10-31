"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = getById;

var driveExcelService = _interopRequireWildcard(require("../API/googleDriveExcelAPI"));

/**
 * Read Excel file By Its ID
 *
 * @export
 * @param {*} fileId
 * @returns
 */
function getById(fileId) {
  return driveExcelService.readExcelFileById(fileId);
}