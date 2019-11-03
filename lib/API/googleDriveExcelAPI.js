"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readExcelFileById = readExcelFileById;

var _googleSpreadsheet = _interopRequireDefault(require("google-spreadsheet"));

var _waterfall = _interopRequireDefault(require("async/waterfall"));

var _credentials = _interopRequireDefault(require("../constants/credentials"));

/**
 * Read all worksheets data and handle their promise as one.
 *
 * @param {*} worksheets
 * @returns {}  Promise - Worksheet Array or Error
 */
function getAllRows(worksheets) {
  function getWorksheetRows(worksheet) {
    // Returns promise object, worksheet.getRows reads the single worksheet at a time
    return new Promise(function (resolve, reject) {
      worksheet.getRows(worksheet.id, function (worksheetError, dataRows) {
        if (worksheetError) {
          reject(worksheetError);
        }

        resolve({
          title: worksheet.title,
          data: dataRows
        });
      });
    });
  } // Get all worksheets promise data,


  return Promise.all(worksheets.map(function (worksheet) {
    return getWorksheetRows(worksheet);
  }));
}

function readExcelFileById(fileId) {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new _googleSpreadsheet["default"](fileId);
  return new Promise(function (resolve, reject) {
    (0, _waterfall["default"])([function setAuth(callback) {
      // check auth if no issue getDoc else throw error
      doc.useServiceAccountAuth(_credentials["default"], callback);
    }, function getDocInfo(callback) {
      // get doc info from google sheet
      doc.getInfo(callback);
    }, function getWorksheets(docInfo, callback) {
      //set worksheet title and move to next to get all worksheet data
      callback(null, docInfo.title, docInfo.worksheets);
    }, function getWorksheetsData(title, worksheets, callback) {
      // read all worksheet rows data
      getAllRows(worksheets).then(function (worksheetData) {
        callback(null, {
          title: title,
          worksheetData: worksheetData
        });
      })["catch"](function (err) {
        return callback(err);
      });
    }], function (error, results) {
      // callback function for handling errors
      if (error) {
        console.log('error:' + error);
        reject(error);
      }

      if (results) {
        resolve(results);
      }
    });
  });
}