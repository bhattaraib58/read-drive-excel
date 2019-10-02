"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readExcelFileById = readExcelFileById;

var _googleSpreadsheet = _interopRequireDefault(require("google-spreadsheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var credentials = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url
};
console.log(credentials);
var link = "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"; //its file id is 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

function readExcelFileById(fileId) {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new _googleSpreadsheet["default"](fileId);
  return new Promise(function (resolve, reject) {
    doc.useServiceAccountAuth(credentials, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }

      doc.getRows(1, function (error, dataRows) {
        if (error) {
          console.log(error);
          reject(error);
        }

        resolve(dataRows);
      });
    });
  });
}