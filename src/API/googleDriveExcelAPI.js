import GoogleSpreadsheet from "google-spreadsheet";

const credentials = require("../../client_secret.json");

const link =
  "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit";

//its file id is 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

export function readExcelFileById(fileId) {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  const doc = new GoogleSpreadsheet(fileId);

  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(credentials, err => {
      if (err) {
        console.log(err);
        reject(err);
      }

      doc.getRows(1, (error, dataRows) => {
        if (error) {
          console.log(error);
          reject(error);
        }

        resolve(dataRows);
      });
    });
  });
}
