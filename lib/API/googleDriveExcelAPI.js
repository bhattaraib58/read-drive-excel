"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readExcelFileById = readExcelFileById;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _googleSpreadsheet = _interopRequireDefault(require("google-spreadsheet"));

var _waterfall = _interopRequireDefault(require("async/waterfall"));

var _credentials = _interopRequireDefault(require("../constants/credentials"));

/**
 * Read all worksheets data and handle their promise as one.
 *
 * @param {*} worksheets
 * @returns {Worksheet Array or Error}
 */
function getAllRows(_x) {
  return _getAllRows.apply(this, arguments);
}

function _getAllRows() {
  _getAllRows = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(worksheets) {
    var getWorksheetRows, getWorksheetData, _getWorksheetData;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _getWorksheetData = function _ref4() {
              _getWorksheetData = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(worksheet) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getWorksheetRows(worksheet);

                      case 2:
                        return _context2.abrupt("return", _context2.sent);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _getWorksheetData.apply(this, arguments);
            };

            getWorksheetData = function _ref3(_x2) {
              return _getWorksheetData.apply(this, arguments);
            };

            getWorksheetRows = function _ref2(worksheet) {
              // Returns promise object, worksheet.getRows reads the single worksheet at a time
              return new Promise(function (resolve, reject) {
                worksheet.getRows(worksheet.id, function (worksheetError, dataRows) {
                  if (worksheetError) {
                    reject(worksheetError);
                  }

                  resolve(dataRows);
                });
              });
            };

            _context3.next = 5;
            return Promise.all(worksheets.map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(worksheet) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return getWorksheetData(worksheet);

                      case 2:
                        return _context.abrupt("return", _context.sent);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getAllRows.apply(this, arguments);
}

function readExcelFileById(fileId) {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new _googleSpreadsheet["default"](fileId);
  var sheetData = {
    title: null,
    data: []
  };
  return new Promise(function (resolve, reject) {
    (0, _waterfall["default"])([function setAuth(callback) {
      // check auth if no issue getDoc else throw error
      doc.useServiceAccountAuth(_credentials["default"], callback);
    }, function getDocInfo(callback) {
      // get doc info from google sheet
      doc.getInfo(callback);
    }, function getWorksheets(docInfo, callback) {
      //set worksheet title and move to next to get all worksheet data
      sheetData.title = docInfo.title;
      callback(null, docInfo.worksheets);
    }, function getWorksheetsData(worksheets, callback) {
      // read all worksheet rows data
      getAllRows(worksheets).then(function (worksheetsData) {
        sheetData.data = worksheetsData;
        callback(null, sheetData);
      })["catch"](function (err) {
        return callback(err);
      });
    }], function (error, results) {
      // callback function for handling errors
      if (error) {
        console.log("error:" + error);
        reject(error);
      }

      if (results) {
        resolve(sheetData);
      }
    });
  });
}